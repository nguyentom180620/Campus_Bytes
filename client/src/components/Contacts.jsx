import React from 'react'
import linkedin from '../assets/linkedin.png';

const Contacts = () => {
  return (
    <div>
        <div className='flex flex-col items-center m-10'>
            <p className='font-custom text-center text-4xl font-bold'>Contact Information</p>
            <p className='text-center text-lg mt-10'>Please check out our socials if you would like to reach out!</p>
            <div className="bg-neutral-200 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm m-10">
                <div className='flex items-center text-center justify-center space-x-5'>
                    <p className='font-custom text-[25px] text-center mt-5'>Mahika Kakkad</p>
                    <a href="https://www.linkedin.com/in/mahika-kakkad/"><img className='w-[45px] cursor-pointer' src={linkedin} /></a>
                </div>

                <div className='flex items-center text-center justify-center space-x-5'>
                    <p className='text-center font-custom text-[25px] mt-5'>Tom Nguyen</p>
                    <a href="https://www.linkedin.com/in/tom-n180620/"><img className='w-[45px] cursor-pointer' src={linkedin} /></a>
                </div>

                <div className='flex items-center text-center justify-center space-x-5'>
                    <p className='text-center font-custom text-[25px] mt-5'>Aaron Laawn</p>
                    <a href="https://www.linkedin.com/in/aaronlaawn/"><img className='w-[45px] cursor-pointer' src={linkedin} /></a>
                </div>

                <div className='flex items-center text-center justify-center space-x-5'>
                    <p className='text-center font-custom text-[25px] mt-5'>Timothy Kareng</p>
                    <a href="https://www.linkedin.com/in/timothy-kareng/"><img className='w-[45px] cursor-pointer' src={linkedin} /></a>
                </div>
          
           
            </div>

            
        
        </div>
    </div>
  );
};

export default Contacts;