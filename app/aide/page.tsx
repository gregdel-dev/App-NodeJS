'use_client';

export default function Aide(){

    return(
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Comment trouver mon lien d'emploi du temps sur école directe</h1>
            <p>1. Aller sur l'emploi du temps <a href="https://www.ecoledirecte.com" className='text-blue-600 underline hover:text-blue-400' target="_blank" rel="noopener noreferrer">EcoleDirecte</a> sur ordinateur</p>
            <p>2. Cliquer sur l'icone partager à côté de "Mon emploi du temps" <img src="ecoledirecte_screen_partager.jpg" alt="Capture d'écran EcoleDirecte" /></p>
            <p>3. Cliquer sur "Copier l'url dans le presse-papier"</p>
            <p>4. Coller l'url (Ctrl+V)</p>

        </div>
    </main>
    )
}