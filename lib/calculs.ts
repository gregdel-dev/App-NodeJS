import ICAL from 'ical.js';
//import { useState } from 'react';
import  { Heures } from "./types"


export function calculerHeuresTotales(icsText: string, deadline : Date){
    const jcalData = ICAL.parse(icsText);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');
    const heures= new Heures()

    let lastName="test"
    let totalHeures=0
    let totalAnnule=0
    vevents.forEach((vevent)=>{
        const event = new ICAL.Event(vevent);
        let annule=false
        let doublon= false
        if (event.summary.startsWith("ANNULE"))  {annule= true}
        if (event.summary===lastName) doublon = true
        lastName=event.summary
        if (event.isRecurring() && !annule && !doublon){
            console.log("test")
            const iterator = event.iterator();
            let nextDate: ICAL.Time | null;
            while ((nextDate = iterator.next())) {
                if(nextDate.toJSDate()>deadline) break
                const occurrence = event.getOccurrenceDetails(nextDate);
                const duree = (occurrence.endDate.toJSDate().getTime() - occurrence.startDate.toJSDate().getTime()) / (1000 * 60 * 60);
                totalHeures += duree;
            }
            
        } else if (!doublon) {
            if (event.startDate.toJSDate()< deadline){
                const duree = (event.endDate.toJSDate().getTime() - event.startDate.toJSDate().getTime()) / (1000 * 60 * 60)
                if (annule) totalAnnule+=duree
                else totalHeures += duree
            }
        }

    })

    heures.total=Math.trunc(totalHeures)
    heures.totalAnnule=Math.trunc(totalAnnule)
    return  heures
}
