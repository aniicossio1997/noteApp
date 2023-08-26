export const getInitialStringToImage=(word:string)=>{
        const palabras = word.split(" ");
        let iniciales = "";
         iniciales = palabras.map((palabra) => palabra[0].toUpperCase()).join("");
        if (iniciales.length > 1) {
          return iniciales;
        } else {
          return iniciales[0];
        }
      
        
      
}