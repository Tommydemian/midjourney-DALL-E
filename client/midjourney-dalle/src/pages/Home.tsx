import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

//Components
import { RenderCards, Card, FormField } from '../components'

interface Post {
name: string
photo: string
prompt: string
__v: number
 _id: string
}


const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState<Post[] | null>(null);
    const [searchText, setSearchText] = useState('');
    const [searchedResults, setSearchedResults] = useState<Post[] | null>(null)
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null)
    
    

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/posts', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // response ok? 
                if (response.status === 200){
                    const data = response.data
                    setAllPosts(data.data)
                }
                
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])
    
    const handleSearchChange = (e: any ) => {
        setSearchText(e.target.value)

        // debounce time
        setSearchTimeout(
        setTimeout(() => {
            if (allPosts){
                const searchResults = allPosts.filter(
                    (item) => item.name.toLowerCase().includes(searchText.toLowerCase())
                    ||  
                    item.prompt.toLowerCase().includes(searchText.toLowerCase()))
                    setSearchedResults(searchResults)
                }
        }, 1000))
    }

    return (
        <section className='max-w-7x1 mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    The Community Showcase
                </h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
                    Browse trough a collection of imaginative and visually stunning images generated by DELL-E AI
                </p>
            </div>

            <div className='mt-16'>
                <FormField 
                  labelName='search posts'
                  type="text"
                  name='text'
                  placeholder='Search Posts...'
                  value={searchText}
                  handleChange={handleSearchChange}
                />
            </div>

            <div className='mt-10'>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <ClipLoader
                                color={'#175676'}
                                loading={loading}
                                size={75}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> 
                        </div>
                    ): (
                        <>
                          { searchText && (
                            <h2 className='font-medium text-[#666e75] text-xl mb-3 '>
                                Showing results for <span className='text-[#222328]'>{searchText}</span>
                            </h2>
                          )}
                        </>
                    )
                }
                <div className='grid xs:grid-cols-2 sm-grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-3'>
                    {
                        searchText ? (
                            <RenderCards
                               data={searchedResults}
                               title='No search results found'
                              />
                        ): (
                            <RenderCards
                              data={allPosts}
                              title='No Posts found'
                             />
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Home