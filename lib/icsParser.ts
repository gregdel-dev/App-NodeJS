// lib/icsParser.ts
import ICAL from 'ical.js';

export interface CourseEvent {
  summary: string;
  start: Date;
  end: Date;
  durationHours: number;
}

export function calculateRemainingHours(icsContent: string, deadline: Date): number {
  const jcalData = ICAL.parse(icsContent);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  let totalSeconds = 0;

  vevents.forEach((vevent) => {
    const event = new ICAL.Event(vevent);
    
    // Gestion des événements récurrents (RRULE)
    // Si l'événement est récurrent, on doit générer toutes les occurrences jusqu'à la deadline
    if (event.isRecurring()) {
      const iterator = event.iterator();
      let nextDate: ICAL.Time | null;
      
      while ((nextDate = iterator.next())) {
        if (nextDate.toJSDate() >= deadline) break;
        
        // On calcule la durée de cette occurrence spécifique
        const occurrence = event.getOccurrenceDetails(nextDate);
        const durationSec = (occurrence.duration.toSeconds());
        
        // Vérifier que l'occurrence ne dépasse pas la deadline en cours
        const occurrenceEnd = occurrence.endDate.toJSDate();
        if (occurrenceEnd > deadline) {
          // On ne compte que la partie avant la deadline
          const occurrenceStart = occurrence.startDate.toJSDate();
          const truncatedSeconds = (deadline.getTime() - occurrenceStart.getTime()) / 1000;
          totalSeconds += Math.max(0, truncatedSeconds);
        } else {
          totalSeconds += durationSec;
        }
      }
    } else {
      // Événement unique
      const startDate = event.startDate.toJSDate();
      const endDate = event.endDate.toJSDate();

      if (startDate < deadline) {
        // Si la fin est après la deadline, on coupe à la deadline
        const effectiveEnd = endDate > deadline ? deadline : endDate;
        const durationMs = effectiveEnd.getTime() - startDate.getTime();
        if (durationMs > 0) {
          totalSeconds += durationMs / 1000;
        }
      }
    }
  });

  // Conversion en heures décimales
  return parseFloat((totalSeconds / 3600).toFixed(2));
}