// test-api.js
async function testPost() {
  const data = {
    id_emplacement: 2,
    code_barre : "3024360123459e",
    date_peremption : "2026-123",
    quantite : 15,
    nom : "un nom",
    marque : "marque",
    poids : 12,
    url_image : "test",
  };

  try {
    const response = await fetch('http://localhost:3000/api/data_gestion/get/produit', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "x-api-key":"Y+gI#lSP8N&faclf+O?h6geGu@-3truxi0uvunUsTihajud", "User-Agent": "Mozilla/5.0 (Linux; Android $version; $manufacturer $model) GregApp"},
      //body: JSON.stringify(data)
    });
    const response_Post =await fetch('http://localhost:3000/api/data_gestion/ajout/emplacement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "x-api-key":"Y+gI#lSP8N&faclf+O?h6geGu@-3truxi0uvunUsTihajud", "User-Agent": "Mozilla/5.0 (Linux; Android $version; $manufacturer $model) GregApp"},
      body: JSON.stringify(data)
    });
    //const result = await response_Post
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Succès:', result);
    } else {
      console.error('❌ Erreur API:', response.status, result);
    }
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
  }
}

testPost();

