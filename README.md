## PROIECT CLOUD COMPUTING - COLORS CATALOG APPLICATION 
## Claudia Ioana Frincu, SIMPRE

## 1. Introducere
Cloud computing permite accesul la resurse prin intermediul internetului. Utilizatorii pot alege inclusiv resurse gratuite, iar pentru cele cu plată, se va plăti doar pentru ceea ce folosesc. Beneficiile includ flexibilitate, scalabilitate și reducerea costurilor.
Aplicația creată în acest proiect răspunde nevoii utilizatorilor de a avea o modalitate rapidă de a găsi culori noi pentru proiectele lor și de a avea mereu la îndemână o listă cu culorile preferate.
Link publicare aplicație: https://cc-project-sem.vercel.app
Link GitHub: https://github.com/FrClaudia/cc-project-sem 
Link înregistrare YouTube (unlisted): https://youtu.be/goO83rZ6tW8

## 2. Descriere problemă
Aplicația 'Colors Catalog' este o soluție ce oferă o interfață prietenoasă, plăcută pentru utilizator, cu o pagină în care să vizualizeze lista de culori preferate (cu informațiile despre ele și cu opțiunea de ștergere), o pagină în care poate să genereze culori (cu opțiunea de a le salva pe cele preferate în listă) și o pagină în care poate să filtreze lista de culori. Se salvează mai multe date despre culori în baza de date: nume, hex, rgb, cymk, culoare de contrast. Astfel, aplicația este utilă pentru oricine dorește să aleagă culori noi, armonioase și estetice pentru diferite proiecte, avându-le mereu la îndemână prin funcția de salvare a preferatelor.

## 3. Descriere API
Pentru a obține date despre culorile generate, care apoi vor fi salvate în baza de date, este apelat un API gratuit https://www.thecolorapi.com, care returnează informații despre culoarea menționată în request, într-un anumit format ales. 
Un request GET este de tipul: 
https://www.thecolorapi.com/id?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html

De asemenea, aplicația folosește o bază de date în Cloud, și anume MongoDB. Mongo Atlas este un serviciu MongoDB care pune la dispoziția clienților servere de baze de date NoSQL scalabile și flexibile, complet gestionate, atât în varianta gratuită (folosită în această aplicație), cât și în cea cu plată. Acest serviciu elimină nevoia de a instala, actualiza, monitoriza și asigura securitatea bazelor de date, deoarece aceste operații sunt realizate de către experții MongoDB. 
[https://github.com/FrClaudia/cc-project-sem/blob/main/pictures_documentation/mongo_1.jpeg]
Informațiile despre culorile adăugate la preferate de utilizator se stochează în baza de date, în colecția “colors”. Conectarea în aplicație se face printr-un connection string unic al bazei de date. Pentru conectarea locală la baza de date am folosit MongoDB Compass. Câteva exemple de date salvate în bază se pot observa în imaginea din documentația PDF sau de pe linkul urmator.
[https://github.com/FrClaudia/cc-project-sem/blob/main/pictures_documentation/mongo_2.jpeg]
Vercel este un serviciu de cloud ce oferă o platformă dezvoltatorilor pentru crearea și livrarea de aplicații web. Se concentrează pe viteză, performanță și livrare instantanee a aplicațiilor. Principala tehnologie pe care se bazează Vercel este Next.js, un framework popular de dezvoltare web bazat pe React.js, tehnologie utilizată și în acest proiect. Vercel oferă un mediu de dezvoltare ușor de utilizat, fiind popular printre dezvoltatori pentru crearea aplicațiilor web. Pentru utilizarea non-comercială sau hobby, acest serviciu oferă un plan gratuit, dar există și planuri cu plată.
[https://github.com/FrClaudia/cc-project-sem/blob/main/pictures_documentation/vercel_2_pricing.jpeg]
În imaginea din documentație se poate observa o previzualizare a deployment-ului aplicației dezvoltate pe Vercel.
[https://github.com/FrClaudia/cc-project-sem/blob/main/pictures_documentation/vercel_1_deployment.jpeg]

## 4. Flux de date - exemple de request / response & metode HTTP
În aplicație se folosesc metode HTTP de tip GET, DELETE, POST.
În prima pagină, utilizatorul poate vizualiza toate informațiile despre culorile salvate în baza de date (preluarea acestor date se face printr-un request GET) și are opțiunea de a șterge fiecare culoare din baza de date (ștergerea se face printr-un request DELETE).
Exemplu request GET: https://cc-project-sem.vercel.app/api/colors
Acest request se face astfel în MainPage.jsx:
```
    useEffect(() => {
        try{
            fetch('/api/colors', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => setColors(json.data));
        }
        catch (error) {
            console.log(error);
        }
    }, []); 
```
Un response are următoarea structură (json):
```
{
    "data": [
        {  "_id": "645fed7b55e242a06390433c",
            "name": "Horizon",
            "hex_value": "#548499",
            "rgb_value": "rgb(84, 132, 153)",
            "cmyk_value": "cmyk(45, 14, 0, 40)",
            "contrast": "#000000"  },
...
        {  "_id": "6462a89eb184bdb1547f2e3b",
            "name": "Mountain Meadow",
            "hex_value": "#26BE8E",
            "rgb_value": "rgb(38, 190, 142)",
            "cmyk_value": "cmyk(80, 0, 25, 25)",
            "contrast": "#000000"   }   
]   }
```
Apoi, datele se vor afișa în interfață:
```
<div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                    {colors.map(color => (
                        <div
                            key={color._id}
                            style={{background: color.hex_value.toString(), fontFamily: 'Georgia' }}
                            className="block max-w-sm p-6 rounded-lg">
                            <div 
                                className="block max-w-sm p-4 rounded-lg bg-white rounded-lg shadow hover:bg-gray-300 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700" >
                                <h5 className="flex justify-center mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 light:text-black">
                                    {color.name}
                                </h5>
                                <div className="flex justify-center mt-4 font-bold text-black">
                                    HEX {color.hex_value}
                                </div>
                                <div className="flex justify-center mt-4 font-normal text-black">
                                    {color.rgb_value}
                                </div>
                                <div className="flex justify-center mt-4 font-normal text-black">
                                    {color.cmyk_value}
                                </div>
                                <div className="flex justify-center mt-4 font-normal text-black">
                                    contrast {color.contrast}
                                </div>
                            </div>  
                            <div className={"flex justify-center mt-4"}>
                                <button type="button"
                                        id={color._id}
                                        onClick={deleteColor}
                                        style={{ fontWeight: 'bold' }}
                                        className="focus:outline-none focus:ring-4 text-black font-medium rounded-lg text-sm px-4 py-2.5 mr-1 mb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-300 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
                                        Delete color 
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
```
Din pagina principală există două fluxuri posibile.
Unul dintre ele este de a accesa o pagină în care culorile salvate se pot filtra după nume. Inițial, culorile se preiau din baza de date (prin GET), iar în funcție de input-ul utilizatorului se filtrează lista obținută și se afișează.
Celălalt flux este de a accesa o pagină în care se pot genera culori prin apăsarea unui buton, afișându-se culoarea, denumirea și codul hex. 
La fiecare apăsare pe butonul de generare culoare nouă, se apelează o funcție care face un request de tip GET cu codul hex către un API (thecolorapi) care răspunde cu informații despre culoarea respectivă.
```
    async function getColorInfo(hexCode) {
        const data_err = "";
        try {
            const response = await fetch(`https://www.thecolorapi.com/id?format=json&hex=${hexCode}`);
            const data = await response.json();
            return data;
        }
        catch(error){
            return data_err;
        }
      }
```
Un exemplu de request GET: https://www.thecolorapi.com/id?format=json&hex=0047AB.
Pentru request-ul GET de mai sus, response-ul din care se iau informații (hex, rgb, name, cmyk, contrast) este de forma:
```
{   "hex": { "value": "#0047AB", "clean": "0047AB" },
    "rgb": { "fraction": { "r": 0, "g": 0.2784313725490196, "b": 0.6705882352941176 },
        "r": 0, "g": 71, "b": 171, "value": "rgb(0, 71, 171)" },
    "hsl": { "fraction": {"h": 0.5974658869395711, "s": 1, "l": 0.3352941176470588 },
        "h": 215,"s": 100, "l": 34, "value": "hsl(215, 100%, 34%)" },
    "hsv": { "fraction": {"h": 0.5974658869395711, "s": 1, "v": 0.6705882352941176 },
        "value": "hsv(215, 100%, 67%)", "h": 215, "s": 100, "v": 67 },
    "name": { "value": "Cobalt", "closest_named_hex": "#0047AB", "exact_match_name": true, distance": 0 },
    "cmyk": { "fraction": { "c": 1, "m": 0.5847953216374269, "y": 0, "k": 0.3294117647058824 },
        "value": "cmyk(100, 58, 0, 33)", "c": 100, "m": 58, "y": 0, "k": 33 },
    "XYZ": { "fraction": { "X": 0.22060823529411763, "Y": 0.2475505882352941, "Z": 0.6705831372549019 },
        "value": "XYZ(22, 25, 67)", "X": 22, "Y": 25, "Z": 67 },
    "image": { "bare": "https://www.thecolorapi.com/id?format=svg&named=false&hex=0047AB",
               "named": "https://www.thecolorapi.com/id?format=svg&hex=0047AB" },
    "contrast": { "value": "#ffffff" },
    "_links": {"self": { "href": "/id?hex=0047AB" } },
    "_embedded": {}   }
```
Există de asemenea un buton pentru a salva culoarea și informațiile furnizate de API despre ea (name, hex, rgb, cmyk, contrast) în baza de date printr-un request de tip POST, apelat astfel:
```
    const insertColorGenerated = (event) => {
        event.preventDefault();
        if (colorData != '') {
            const name = colorData.name.value.toString();
            const hex_value = colorData.hex.value.toString();
            const rgb_value = colorData.rgb.value.toString();
            const cmyk_value = colorData.cmyk.value.toString();
            const contrast = colorData.contrast.value.toString();
            const data = {name, hex_value, rgb_value, cmyk_value, contrast}; 
            fetch("/api/colors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(() => {
                console.log("New color inserted");
                const name = colorData.name.value.toString();
                document.getElementById("insertText").innerHTML = 'Color ' + name + ' added to your favorites!'
                colorData = "";
            });
        } 
    }
```
Utilizatorul primește un mesaj de succes după ce salvează o culoare.

## 5. Capturi ecran aplicație
Imagini din aplicație se pot găsi si în documentația PDF. 
Capturile de ecran cuprind: pagina principală a aplicației, pagina pentru filtrare listă culori după nume, pagina de generare și adăugare culori.
[https://github.com/FrClaudia/cc-project-sem/blob/main/pictures_documentation/1_main_page_catalog.jpeg]
[https://github.com/FrClaudia/cc-project-sem/blob/main/pictures_documentation/2_page_filter_catalog.jpeg]
[https://github.com/FrClaudia/cc-project-sem/blob/main/pictures_documentation/3_page_generate_add_color.jpeg]

## 6. Referințe
[The Color API Docs] https://www.thecolorapi.com/docs 
[MongoDB Documentation] https://www.mongodb.com/docs/ 
[Cum sa faci in cloud un cluster gratuit de MongoDB] https://askit.ro/solutii/cum-sa-faci-in-cloud-un-cluster-gratuit-de-mongodb/
[Vercel Documentation] https://vercel.com/docs
[9 platforme de găzduire prietenoase pentru dezvoltatori pentru a implementa aplicații SaaS] https://tipstrick.ro/9-platforme-de-gazduire-prietenoase-pentru-dezvoltatori-pentru-a-implementa-aplicatii-saas/
