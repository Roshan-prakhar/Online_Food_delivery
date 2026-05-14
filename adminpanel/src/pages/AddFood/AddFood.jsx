import React, { useState } from 'react';
import {assets} from '../../assets/assets';
import axios from 'axios';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';

const AddFood = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:'',
        description: '',
        price:'',
        category: 'Biryani'
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Please select an image.');
            return;
        }
        try {
            await addFood(data, image);
            toast.success('Food added successfully.');
            setData({name: '', description: '', category: 'Biryani', price: ''});
            setImage(null);
        } catch (error) {
            toast.error('Error adding food.');
        }
    }

  return (
    <div className="container" style={{ backgroundColor: '#000000', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div 
            className="card" 
            style={{ 
              backgroundColor: '#111111', 
              border: '1px solid #2a2a2a',
              borderRadius: '20px'
            }}
          >
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold" style={{ color: '#fff' }}>
                  Add <span style={{ color: '#f5a623' }}>Food</span>
                </h2>
                <p style={{ color: '#8b8b8b' }}>Add a new dish to your menu</p>
              </div>
              <form onSubmit={onSubmitHandler}>
                <div className="mb-4 text-center">
                  <label htmlFor="image" className="form-label d-block">
                    <div 
                      style={{ 
                        width: '120px', 
                        height: '120px', 
                        borderRadius: '16px', 
                        border: '2px dashed #2a2a2a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        backgroundColor: '#1a1a1a'
                      }}
                    >
                      <img 
                        src={image ? URL.createObjectURL(image): assets.upload} 
                        alt="" 
                        style={{ 
                          width: image ? '100%' : '48px', 
                          height: image ? '100%' : '48px',
                          objectFit: image ? 'cover' : 'contain'
                        }} 
                      />
                    </div>
                    <small style={{ color: '#8b8b8b', marginTop: '8px', display: 'block' }}>
                      Click to upload image
                    </small>
                  </label>
                  <input type="file" className="form-control" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ color: '#8b8b8b', fontSize: '0.9rem' }}>Name</label>
                  <input 
                    type="text" 
                    placeholder='Chicken Biryani' 
                    className="form-control" 
                    id="name" 
                    required 
                    name='name' 
                    onChange={onChangeHandler} 
                    value={data.name}
                    style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px', padding: '12px 16px' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" style={{ color: '#8b8b8b', fontSize: '0.9rem' }}>Description</label>
                  <textarea 
                    className="form-control" 
                    placeholder='Write content here...' 
                    id="description" 
                    rows="4" 
                    required 
                    name='description' 
                    onChange={onChangeHandler} 
                    value={data.description}
                    style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px', padding: '12px 16px' }}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label" style={{ color: '#8b8b8b', fontSize: '0.9rem' }}>Category</label>
                  <select 
                    name="category" 
                    id="category" 
                    className='form-select' 
                    onChange={onChangeHandler} 
                    value={data.category}
                    style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px', padding: '12px 16px' }}
                  >
                    <option value="Biryani">Biryani</option>
                    <option value="Cake">Cake</option>
                    <option value="Burger">Burger</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Salad">Salad</option>
                    <option value="Ice cream">Ice cream</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="form-label" style={{ color: '#8b8b8b', fontSize: '0.9rem' }}>Price</label>
                  <div className="input-group">
                    <span 
                      className="input-group-text" 
                      style={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '2px solid #2a2a2a', 
                        borderRight: 'none', 
                        color: '#f5a623',
                        borderRadius: '12px 0 0 12px'
                      }}
                    >
                      &#8377;
                    </span>
                    <input 
                      type="number" 
                      name="price" 
                      id="price" 
                      placeholder='200' 
                      className='form-control' 
                      onChange={onChangeHandler} 
                      value={data.price}
                      style={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '2px solid #2a2a2a', 
                        borderLeft: 'none', 
                        color: '#fff',
                        borderRadius: '0 12px 12px 0',
                        padding: '12px 16px'
                      }}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="btn w-100"
                  style={{
                    backgroundColor: '#f5a623',
                    color: '#000',
                    borderRadius: '30px',
                    padding: '14px',
                    fontWeight: '600',
                    border: 'none',
                    fontSize: '1rem'
                  }}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Save Food
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFood;