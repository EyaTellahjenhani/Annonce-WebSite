import axios from "axios";
import { Modal, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const AddListing = ({openModal, setOpenModal}) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
        try {
  
            const { data } = await axios.get("/api/categories");
            setCategory(data);
        } catch (error) {
          setError("Failed to load Data");
         
        } finally {
          setLoading(false);
        }
      };

      fetchCategory();
  }, []);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    Location: '',
    description: '',
    price: '',
    image: []

})

const handelChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}



const handelImagesUpload = (e) => {
  const files = Array.from(e.target.files);

  files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((oldImages) => [...oldImages, reader.result]);  
            setImages((oldImages) => [...oldImages, reader.result]);
              setFormData({ ...formData, image: [...images, reader.result] })
          }
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: images })
  });
};

const deleteImagePreview = (index) => {
  setImagesPreview(imagesPreview.filter((h, i) => i !== index));
  setImages(images.filter((h, i) => i !== index));
  setFormData({ ...formData, images: images.filter((h, i) => i !== index) })

};

const handleSubmit = async (e) => {
  
  setLoading(true);
  e.preventDefault();
  setFormData({ ...formData, image: images })

  try {
      await axios.post('/api/listings/', formData, { withCredentials: true }).then((res) => {
        setLoading(false);
          setSuccess(res.data);
          window.location.reload();
          setError("")
          setOpenModal(false)
      }).catch((err) => {
          setError(err.response.data);
          setSuccess("")
          setLoading(false)
      
      });

  } catch (err) {
      console.log(err);
  }
}


  return (

    <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
            <Modal.Header />
            <Modal.Body>


            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Créer un nouveau produit
              </h3>
            </div>
            {/* Modal body */}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Titre
                  </label>
                  <input
                  onChange={handelChange}
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Donner un titre à votre produit"
                    required=""
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="prix"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Prix
                  </label>
                  <input
                  onChange={handelChange}
                    type="number"
                    name="price"
                    id="prix"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Prix du produit"
                    required=""
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="catégorie"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Catégorie
                  </label>
                  <select
                  onChange={handelChange}
                    name="category"
                    id="catégorie"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected="">Choisir une catégorie</option>
                    {category?.map((item,i)=>(<option value={item.CategoryID}>{item.CategoryName}</option>))
                    }
                  </select>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="localisation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Localisation
                  </label>
                  <select
                  onChange={handelChange}
                  name="Location"
                    id="localisation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected="">Choisir une localisation</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Sfax">Sfax</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Kairouan">Kairouan</option>
                    <option value="Bizerte">Bizerte</option>
                    <option value="Gabes">Gabes</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Mannouba">La Mannouba</option>
                    <option value="Nabeul">Nabeul</option>
                    <option value="Zaghouan">Zaghouan</option>
                    <option value="Beja">Béja</option>
                    <option value="Jendouba">Jendouba</option>
                    <option value="Kebili">Kebili</option>
                    <option value="Siliana">Siliana</option>
                    <option value="Gafsa">Gafsa</option>
                    <option value="Tozeur">Tozeur</option>
                    <option value="Kasserine">Kasserine</option>
                    <option value="Kef">Le Kef</option>
                    <option value="Mahdia">Mahdia</option>
                    <option value="Medenine">Medenine</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Tataouine">Tataouine</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description du produit
                  </label>
                  <textarea
                  onChange={handelChange}
                    name="description"
                    id="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Écrivez la description du produit ici"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div
                className="col-span-2  relative border-2 border-gray-300 border-dashed rounded-lg p-6 mb-4"
                id="dropzone"
              >
                <input
                onChange={handelImagesUpload}
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 z-50"
                />
                <div className="text-center">
                  <img
                    className="mx-auto h-12 w-12"
                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                    alt=""
                  />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer"
                    >
                      <span>Drag and drop</span>
                      <span className="text-indigo-600"> or browse</span>
                      <span>to upload</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
<div className="flex justify-center items-center flex-wrap">

              {imagesPreview.map((image, i) => (
                <div className="flex flex-row ">
                            <img
                                width="150px"
                                height="150px"
                                draggable="false"
                                src={image}
                                name="images"
                                alt="Product"
                                key={i}
                                className="w-36 m-2 h-36 flex"
                                />

                            <div onClick={() => deleteImagePreview(i)} className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-1 cursor-pointer">

                               <CloseIcon/>
                            </div>

                        </div>))}

                                </div>
                               
                               
                    <div className="flex justify-center flex-col items-center">
                  
                  
                   {
                                  loading && <div className="text-center my-5"><Spinner /> </div>
                                }
                                {
                                  error && <div className="text-center text-red-600 my-5 ">{error}</div>
                                }

                    <button
              onClick={handleSubmit}
                type="submit"
                className="text-white  inline-flex items-center bg-sky-900 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Ajouter un nouveau produit
              </button>
                    </div>
            
            </form>
        

            </Modal.Body>
        </Modal>
  );


};

export default AddListing;
