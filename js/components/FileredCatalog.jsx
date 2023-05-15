// js/components/FilteredCatalog.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function FilteredCatalog() {
	const [colors, setColors] = useState([]);
    const [searchText, setSearchText] = useState('blue');

	const router = useRouter();

	function handleClick() {
		router.push('/');
	}

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredColors = colors.filter((color) =>
        color.name.toLowerCase().includes(searchText.toLowerCase())
    );


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

	const deleteColor = (event) => {
		event.preventDefault();
		const id = event.target.id;
		// console.log(id);
		try {
			fetch(`/api/colors?id=${id}`, {
				method: 'DELETE',
			})
				.then(response => response.json())
				.then(json => {
						setColors(colors.filter(color => color._id !== id));
				});
		}
		catch (error) {
			console.log(error);
		}
	}

    
	return (
		<section className="bg-white dark:bg-gray-900" style = {{background: "linear-gradient(to top, black, #243B55)"}} > 
			<div className="container px-6 py-10 mx-auto">
				<h1 style={{ fontWeight: 'bold', fontFamily: 'Georgia' }}
				    className="w-[500px] mx-auto text-center text-6xl">Colors catalog</h1>
				
                <div className="w-[1000px] mx-auto text-center mt-4 text-3xl">
				    <button type="button" 
				           onClick={handleClick}
				           className="focus:outline-none focus:ring-4 text-black font-medium rounded-lg text-sm px-4 py-2.5 mr-1 mb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 light:bg-gray-800 light:border-gray-700 light:hover:bg-gray-700">
				        <div style={{ fontWeight: 'bold', fontFamily: 'Georgia' }}>Back to full list</div>
				    </button>
				</div>
				<p  style={{ fontStyle: 'italic', fontFamily: 'Georgia' }}
				    className="w-[1000px] mx-auto text-center mt-4 text-3xl ">
                        List of your favorite colors <span style={{ fontWeight: 'bold' }}>filtered</span>:
                </p>
                <p style={{marginTop: '20px', fontStyle: 'italic', fontFamily: 'Georgia'}}>Filter colors:</p>
                <input 
                    type="text" 
                    value={searchText} 
                    onChange={handleSearchTextChange} 
                    style={{ fontFamily: 'Georgia', padding: '5px', border: "2px solid black", color: 'black' }} 
                />				
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                        {filteredColors.map((color) => (
                            <div key={color._id}
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
                            </div>
                        ))}
				</div>
			</div>
		</section>
	)
}