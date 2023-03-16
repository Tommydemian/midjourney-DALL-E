import React from 'react'
import Card from './Card'

interface Post {
    name: string
    photo: string
    prompt: string
    __v: number
     _id: string
    }

type RenderCardsProps = {
    data: Post[]
    title: string
}

const RenderCards = ({data, title}: RenderCardsProps) => {
    if (data?.length > 0 ) {
        return data?.map((post:Post) => (<Card key={post._id} post={post} />) )
    } else (
        <div>
            <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
              { title }  
            </h2>
        </div>
    )
}

export default RenderCards