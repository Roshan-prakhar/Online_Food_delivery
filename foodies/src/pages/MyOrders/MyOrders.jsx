import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./MyOrders.css";
import { fetchUserOrders } from "../../service/orderService";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await fetchUserOrders(token);
    setData(response);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'preparing': return '#f5a623';
      case 'out for delivery': return '#3399cc';
      case 'delivered': return '#4caf50';
      default: return '#f5a623';
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#000000', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="py-4 row justify-content-center">
        <div className="col-12">
          <h2 className="mb-4" style={{ color: '#fff', fontWeight: '700' }}>
            My <span style={{ color: '#f5a623' }}>Orders</span>
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
                <table className="table table-responsive" style={{ marginBottom: 0 }}>
                  <tbody>
                    {data.map((order, index) => {
                      return (
                        <tr key={index} style={{ borderColor: '#2a2a2a' }}>
                          <td style={{ padding: '20px', borderColor: '#2a2a2a' }}>
                            <div 
                              style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '12px', 
                                backgroundColor: 'rgba(245, 166, 35, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <img
                                src={assets.delivery}
                                alt=""
                                height={28}
                                width={28}
                                style={{ filter: 'brightness(0) saturate(100%) invert(77%) sepia(44%) saturate(5384%) hue-rotate(359deg) brightness(101%) contrast(94%)' }}
                              />
                            </div>
                          </td>
                          <td style={{ padding: '20px', borderColor: '#2a2a2a', minWidth: '250px' }}>
                            <div style={{ color: '#fff', fontWeight: '500', marginBottom: '4px' }}>
                              {order.orderedItems.map((item, index) => {
                                if (index === order.orderedItems.length - 1) {
                                  return item.name + " x " + item.quantity;
                                } else {
                                  return item.name + " x " + item.quantity + ", ";
                                }
                              })}
                            </div>
                            <small style={{ color: '#6b6b6b' }}>{order.userAddress}</small>
                          </td>
                          <td style={{ padding: '20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600', fontSize: '1.1rem' }}>
                            &#x20B9;{order.amount.toFixed(2)}
                          </td>
                          <td style={{ padding: '20px', borderColor: '#2a2a2a', color: '#8b8b8b' }}>
                            Items: <span style={{ color: '#fff', fontWeight: '500' }}>{order.orderedItems.length}</span>
                          </td>
                          <td style={{ padding: '20px', borderColor: '#2a2a2a' }}>
                            <span 
                              className="fw-bold text-capitalize"
                              style={{ color: getStatusColor(order.orderStatus) }}
                            >
                              <span style={{ marginRight: '6px' }}>&#x25cf;</span>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td style={{ padding: '20px', borderColor: '#2a2a2a' }}>
                            <button
                              className="btn btn-sm"
                              onClick={fetchOrders}
                              style={{
                                backgroundColor: 'rgba(245, 166, 35, 0.1)',
                                border: '1px solid rgba(245, 166, 35, 0.3)',
                                color: '#f5a623',
                                borderRadius: '8px',
                                padding: '6px 12px'
                              }}
                            >
                              <i className="bi bi-arrow-clockwise"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {data.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-5">
                          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            <i className="bi bi-bag-x" style={{ color: '#2a2a2a' }}></i>
                          </div>
                          <h4 style={{ color: '#8b8b8b' }}>No orders yet.</h4>
                          <p style={{ color: '#6b6b6b' }}>Your order history will appear here.</p>
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

export default MyOrders;