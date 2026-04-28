import db from '@/lib/db'
import {checkApiKey, forbidenReponse} from '@/lib/Gestion/auth'

export async function POST(req) {
  if (!checkApiKey(req)) return forbidenReponse()
  const newItem = await req.json();
  const existing = db.prepare('SELECT 1 FROM Produits WHERE code_barre = ?').get(newItem.code_barre);
  
  if (existing) db.prepare('UPDATE Produits SET nom = ?, marque = ?, poids = ?, url_image = ? WHERE code_barre= ?').run( newItem.nom, newItem.marque, newItem.poids, newItem.url_image, newItem.code_barre)
  else db.prepare('INSERT INTO Produits (code_barre, nom, marque, poids, url_image) VALUES(?,?,?,?,?)').run(newItem.code_barre, newItem.nom, newItem.marque, newItem.poids, newItem.url_image)
  return Response.json({ success: true });

}

