import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFoodDetails } from "../../service/foodService";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const FoodDetails = () => {
  const { id } = useParams();
  const { increaseQty } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({});

  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        const foodData = await fetchFoodDetails(id);
        setData(foodData);
      } catch (error) {
        toast.error("Error displaying the food details.");
      }
    };
    loadFoodDetails();
  }, [id]);

  const addToCart = () => {
    increaseQty(data.id);
    navigate("/cart");
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#000000', minHeight: '100vh', paddingTop: '100px !important' }}>
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <div style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              border: '1px solid #2a2a2a',
              boxShadow: '0 20px 60px rgba(245, 166, 35, 0.1)'
            }}>
              <img
                className="card-img-top mb-5 mb-md-0"
                src={data.imageUrl}
                alt={data.name}
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="fs-5 mb-2">
              <span style={{ color: '#8b8b8b' }}>Category: </span>
              <span 
                className="badge" 
                style={{ backgroundColor: 'rgba(245, 166, 35, 0.15)', color: '#f5a623', border: '1px solid rgba(245, 166, 35, 0.3)', padding: '6px 14px', borderRadius: '20px', fontWeight: '500' }}
              >
                {data.category}
              </span>
            </div>
            <h1 className="display-5 fw-bolder" style={{ color: '#fff', marginBottom: '1rem' }}>
              {data.name}
            </h1>
            <div className="fs-3 mb-3">
              <span style={{ color: '#f5a623', fontWeight: '700' }}>&#8377;{data.price}.00</span>
            </div>
            <p className="lead" style={{ color: '#8b8b8b', lineHeight: '1.8', fontSize: '1.05rem' }}>
              {data.description}
            </p>
            <div className="d-flex gap-3 mt-4">
              <button
                className="btn btn-lg"
                type="button"
                onClick={addToCart}
                style={{
                  backgroundColor: '#f5a623',
                  color: '#000',
                  borderRadius: '30px',
                  padding: '12px 30px',
                  fontWeight: '600',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="bi bi-cart-fill"></i>
                Add to cart
              </button>
              <button
                className="btn btn-lg btn-outline"
                type="button"
                onClick={() => navigate('/explore')}
                style={{
                  border: '2px solid #2a2a2a',
                  color: '#8b8b8b',
                  borderRadius: '30px',
                  padding: '12px 30px',
                  fontWeight: '600',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#f5a623'; e.currentTarget.style.color = '#f5a623'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#8b8b8b'; }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};