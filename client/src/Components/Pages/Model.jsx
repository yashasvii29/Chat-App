import React from 'react'

const Modal=({isVisible,onClose,children})=> {
    if(!isVisible) return null;

    const handleClose=(e)=>{
        if(e.target.id==='wrapper') onClose();
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="wrapper" >
        <div className="w-[600px] flex flex-col">
            <button className="text-white text-xl place-self-end" onClick={()=> onClose()}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAh5JREFUSEuVV9F1wyAMPG2SbJJM0niSjpJ2EnuTehP3YWQkgQSEj7YPY51OOh0uoSwCcAD2F9IG4UhPznU+lh/lvDyUiOW83SpHa+grvJOEE2F6ixkpAuVPzayJZ9+LCuWn4VZxImPBdNCjLd0OhwX5RCJ6Uf/i81HSaV/L5vO+MjO/TSzMoCpusf1KzZV6Rh+KcdxsDTfXBBmMKIkZ4BuAbwC/ALaBuB8A3gTc86zbMddGkIH7NFYAKeAOYEngwfkHCCuD7Qdwt/LpzLGkaNJ9JRYcJIMTNmtlZ2IpwWs9zRkr38xVW6Aos6lTAScgscnM82pBy7NIHUnt86thzmEtU9B2Vs5ZxuJnFKvO1OBJeFJeqcKAzoixLzoGNw+fBGyGZ8OoveVK67uXhMi/7ukO0EI4GNgC+HNMLC4OGgGr5GvQK66MmrmzPTnLfLvj5limp94bCG/WEoNH4hrNse8oDFpefqpxEsERdhx61Pq31migHgSsSjga9Hr3RcCbbXInYDlOhbcs9SeULXXblj8AqaRpPD3QAq4c7oftNSSlDMRx9byVZnUFYcFR3Mr/CARS2b+AM8HmjM7COJffkX65PI+ajaO/WW1pHGmPBJF5+qZZe8owVhOof40O453JfRYjvm00x6ZQTuX64opyd/DHBEIDiXoTi8v34Tjb+l+h0afPNRnNB4qYXNSCeoBkBtpSN/PXtz3/yq+k7VjEP6P49iXq8pJnAAAAAElFTkSuQmCC"/></button>
            <div className="bg-white p-2 rounded">
            {children}
            </div>


        </div>
      
    </div>
  )
};
export default Modal;
