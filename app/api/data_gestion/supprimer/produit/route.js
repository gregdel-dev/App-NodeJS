import db from '@/lib/db'
import {checkApiKey, forbidenReponse} from '@/lib/Gestion/auth'

export async function POST(req) {
    if (!checkApiKey(req)) return forbidenReponse()
    const Item = await req.json();
    if (!Item.code_barre) {
        return Response.json({ error: "Le code-barre est requis pour supprimer." }, { status: 400 });
    }
    db.prepare('DELETE FROM Produits WHERE code_barre= ?').run(Item.code_barre)
    return Response.json({ success: true });

}