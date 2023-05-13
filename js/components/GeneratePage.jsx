// js/components/GeneratePage.jsx
import { useRouter } from "next/router";

<style jsx>{`
  .center-box {
    margin: 0 auto;
    width: 50%;
    height: 100px;
    background-color: gray;
  }
`}</style>

export default function GeneratePage() {

	const router = useRouter();
	
	var colorData = "";

	function handleClick() {
		router.push('/');
	}

	function generateHexColor() {
		const data_err = "";
		try {
			const hexChars = '0123456789ABCDEF';
			let hex = '';
			for (let i = 0; i < 6; i++) {
			hex += hexChars[Math.floor(Math.random() * 16)];
			}
			console.log(hex.toString());
			return hex.toString();
		}
		catch(error){
			return data_err;
		}
	}

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

	function handleGenerate() {
		const color = generateHexColor().toString();
		colorData = "";
		if (color != "") {
			getColorInfo(color)
			.then(data => {
				// console.log(data);
				//colorData = JSON.parse(data);
				colorData = data;
				const backgroundColor = colorData.hex.value.toString();
				const colorName = colorData.name.value.toString();
				const colorContrast = colorData.contrast.value.toString();
				// console.log(colorContrast)
				document.getElementById("colorBox").style.backgroundColor = backgroundColor;
				document.getElementById("colorText").innerHTML = '~ ' + colorName + ' ~'
				document.getElementById("colorBoxText").style.color = colorContrast
				document.getElementById("colorBoxText").innerText = 'HEX ' + backgroundColor
				document.getElementById("insertText").innerHTML = 'Do you like this color?';
			})
			.catch(error => {
				console.error(error);
				colorData = '';
			});
		}
	}

	function firstColor(){
		handleGenerate()
	}

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

	firstColor();

	return (
		<section className="bg-white dark:bg-gray-900" style={{ background: "linear-gradient(to top, black, #243B55)" }}>
			<div className="container px-6 py-10 mx-auto">
			<h1 className="w-[500px] mx-auto text-center text-6xl" 
			    style={{ fontWeight: 'bold', fontFamily: 'Georgia' }}>Colors catalog</h1>
				
                <div className="w-[1000px] mx-auto text-center mt-4 text-3xl">
				    <button type="button" 
				           onClick={handleClick}
				           className="focus:outline-none focus:ring-4 text-black font-medium rounded-lg text-sm px-4 py-2.5 mr-1 mb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-300 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
				        <div style={{ fontWeight: 'bold', fontFamily: 'Georgia' }}>Go to your favorites</div>
				    </button>
				</div>
				<p  style={{ fontFamily: 'Georgia' }}
				    className="w-[1000px] mx-auto center text-center mt-4 text-3xl">Generate color:</p>
				
				<div className="w-[1000px] mx-auto text-center mt-4 text-3xl">
                  <div id='colorText' className="mx-auto p-5" style={{ fontFamily: 'Georgia' }}></div>
                  <div id='colorBox' 
				       style={{background: 'white', display: "flex", justifyContent: "center", alignItems: "center", width: '50%', height: '200px', margin: 'auto' }} 
				       className="rounded-lg shadow-md" >
                            <div style={{ fontFamily: 'Georgia' }} id="colorBoxText"></div>
					   </div>
				</div>

                <div style={{display: "flex", justifyContent: "center", alignItems: "center" }}
				     className="mx-auto p-5">
					<button type="button" 
							onClick={handleGenerate}
							className="focus:outline-none focus:ring-4 text-black font-medium rounded-lg text-sm px-4 py-2.5 mr-3 mb-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-300 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
							<div style={{ fontWeight: 'bold', fontFamily: 'Georgia' }}>New color</div>
					</button>
					
					<button type="button" 
							onClick={insertColorGenerated}
							className="focus:outline-none focus:ring-4 text-black font-medium rounded-lg text-sm px-4 py-2.5 mr-3 mb-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-300 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
							<div style={{ fontWeight: 'bold', fontFamily: 'Georgia' }}>Add color to your list</div>
					</button>
				</div>
				<div id="insertText" style={{ fontStyle: 'italic', fontFamily: 'Georgia' }} className="mx-auto text-center mt-2 text-2xl">Do you like this color?</div>

			</div>
		</section>
	)
}

