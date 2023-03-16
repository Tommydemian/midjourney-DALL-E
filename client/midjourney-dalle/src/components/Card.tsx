import React from 'react'
import download from '../assets/assets/download.png'
import { downloadImage } from '../utils'

interface Post {
  name: string
  photo: string
  prompt: string
  __v: number
   _id: string
  }

type CardProps = {
  post: Post
}


const Card = ({post}: CardProps) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:cardhover | card'>
      <img 
      src={post.photo}
      alt={post.prompt}
      className='w-full h-auto object-cover rounded-xl'
      />
      <div className='group-hover:flex flex-col max-[h-94.5%] hidden absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] m-2 p-4 rounded-md'>
        <p className='text-white text-xl overflow-y-auto'>
          {post.prompt}
        </p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-lg font-bold'>
              {post.name[0]}
            </div>
            <p className='text-white text-lg'>{post.name}</p>
          </div>
          <button
          type='button'
          onClick={() => downloadImage(post._id, post.photo)}
          className='outline-none border-none bg-transparent'
          >
            <img src={download} alt="download" className='w-6 h-6 object-contain invert' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card