import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";

// Components
import { FormField } from '../components'
// utils
import { getRandomPrompt } from '../utils'
// Assets
import preview from '../assets/assets/preview.png'
import { Form } from 'react-router-dom';

interface FormState {
  name: string,
  prompt: string,
  photo: string
}


const CreatePost = () => {
  const navigate = useNavigate()
  
  
  const [form, setForm] = useState<FormState>({
    name: '',
    prompt: '',
    photo: ''
  })
  
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })
        await response.json();
        navigate('/')
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('please, enter a prompt in order to generate an image')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt})
  }
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const { data } = await axios.post('http://localhost:5000/api/dalle', {
           prompt: form.prompt 
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setForm({
          ...form,
           photo: `data:image/jpeg;base64,${data}`
          })
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please, enter a prompt')
    }
  }

  return (
    <section className='max-w-7x1 mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          The Community Showcase
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Browse trough a collection of imaginative and visually stunning images generated by DELL-E AI and share them with the community
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Jonh Doe"
            value={form.name}
            handleChange={handleChange}
            isSurprisedMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a pencil and watercolor drawing of a bright city in the future with flying cars"
            value={form.prompt}
            handleChange={handleChange}
            isSurprisedMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className={`relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center ${generatingImg ? 'bg-[rgba(0,0,0,0.5)]' : ''}      `}>
            {
              form.photo ? (
                <img
                  src={form.photo}
                  alt={form.photo}
                  className='w-full h-full object-contain'
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className='w-9/12 h-9/12 object-contain opacity-40'
                />
              )
            }

            {
              generatingImg && loading ? (
                <div>
                  <ClipLoader
                    color={'#81D6E3'}
                    loading={generatingImg}
                    size={75}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className='absolute inset-20 flex justify-center items-center'
                  />
                </div>
              ) : (
                <></>
              )

            }
          </div>

          <div className='mt-5 flex gap-5'>
            <button
              type='button'
              onClick={generateImage}
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>
          </div>

          <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with others in the community.</p>
            <button
              type='submit'
              className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full px-5 py-2.5 text-center'
            >
              {loading ? 'Sharing...' : 'Share with the community.'}
            </button>
          </div>

        </div>
      </form>
    </section>
  )
}

export default CreatePost
