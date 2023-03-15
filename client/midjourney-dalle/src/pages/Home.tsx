import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

//Components
import { Card, FormField } from '../components'


const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setSearchText] = useState('');


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
                <FormField />
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
                    {/* {
                        searchText ? (
                            <RenderCards
                               data={[]}
                               title='No search results found'
                              />
                        ): (
                            <RenderCalls
                              data={[]}
                              title='No Posts found'
                             />
                        )
                    } */}
                </div>
            </div>
        </section>
    )
}

export default Home