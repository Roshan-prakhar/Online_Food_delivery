import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ListFood.css";
import { deleteFood, getFoodList } from "../../services/foodService";

const ListFood = () => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error("Error while reading the foods.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success("Food removed.");
        await fetchList();
      } else {
        toast.error("Error occred while removing the food.");
      }
    } catch (error) {
      toast.error("Error occred while removing the food.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container" style={{ backgroundColor: '#000000', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="py-4 row justify-content-center">
        <div className="col-12">
          <h2 className="mb-4" style={{ color: '#fff', fontWeight: '700' }}>
            Food <span style={{ color: '#f5a623' }}>List</span>
          </h2>
          <div 
            className="card" 
            style={{ 
              backgroundColor: '#111111', 
              border: '1px solid #2a2a2a',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            <div className="card-body" style={{ padding: '0' }}>
              <div className="table-responsive">
                <table className="table" style={{ marginBottom: 0 }}>
                  <thead>
                    <tr style={{ borderColor: '#2a2a2a' }}>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>Image</th>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>Name</th>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>Category</th>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>Price</th>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, index) => {
                      return (
                        <tr key={index} style={{ borderColor: '#2a2a2a', transition: 'background-color 0.3s ease' }}>
                          <td style={{ padding: '16px 20px', borderColor: '#2a2a2a' }}>
                            <div style={{ borderRadius: '10px', overflow: 'hidden', width: '48px', height: '48px', border: '1px solid #2a2a2a' }}>
                              <img src={item.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          </td>
                          <td style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#fff', fontWeight: '500' }}>{item.name}</td>
                          <td style={{ padding: '16px 20px', borderColor: '#2a2a2a' }}>
                            <span 
                              className="badge" 
                              style={{ 
                                backgroundColor: 'rgba(245, 166, 35, 0.1)', 
                                color: '#f5a623', 
                                border: '1px solid rgba(245, 166, 35, 0.2)',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontWeight: '500'
                              }}
                            >
                              {item.category}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>
                            &#8377;{item.price}.00
                          </td>
                          <td style={{ padding: '16px 20px', borderColor: '#2a2a2a' }}>
                            <button
                              className="btn btn-sm"
                              onClick={() => removeFood(item.id)}
                              style={{
                                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                border: '1px solid rgba(255, 68, 68, 0.3)',
                                color: '#ff4444',
                                borderRadius: '8px',
                                padding: '6px 14px',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ff4444'; e.currentTarget.style.color = '#fff'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 68, 68, 0.1)'; e.currentTarget.style.color = '#ff4444'; }}
                            >
                              <i className="bi bi-trash-fill me-1"></i>
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {list.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            <i className="bi bi-clipboard-x" style={{ color: '#2a2a2a' }}></i>
                          </div>
                          <h4 style={{ color: '#8b8b8b' }}>No food items found.</h4>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};