import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { fetchAllOrders, updateOrderStatus } from "../../services/orderService";
import { toast } from "react-toastify";

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetchAllOrders();
      setData(response);
    } catch (error) {
      toast.error("Unable to display the orders. Please try again.");
    }
  };

  const updateStatus = async (event, orderId) => {
    const success = await updateOrderStatus(orderId, event.target.value);
    if (success) await fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'food preparing': return '#f5a623';
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
            All <span style={{ color: '#f5a623' }}>Orders</span>
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
                  <thead>
                    <tr style={{ borderColor: '#2a2a2a' }}>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}></th>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>Order Details</th>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>Amount</th>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>Items</th>
                      <th style={{ padding: '16px 20px', borderColor: '#2a2a2a', color: '#f5a623', fontWeight: '600' }}>Status</th>
                    </tr>
                  </thead>
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
                              <img src={assets.parcel} alt="" height={28} width={28} style={{ filter: 'brightness(0) saturate(100%) invert(77%) sepia(44%) saturate(5384%) hue-rotate(359deg) brightness(101%) contrast(94%)' }} />
                            </div>
                          </td>
                          <td style={{ padding: '20px', borderColor: '#2a2a2a', minWidth: '300px' }}>
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
                            <span style={{ color: '#fff', fontWeight: '500' }}>{order.orderedItems.length}</span> items
                          </td>
                          <td style={{ padding: '20px', borderColor: '#2a2a2a' }}>
                            <select
                              className="form-select form-select-sm"
                              onChange={(event) => updateStatus(event, order.id)}
                              value={order.orderStatus}
                              style={{ 
                                backgroundColor: '#1a1a1a', 
                                border: `2px solid ${getStatusColor(order.orderStatus)}`, 
                                color: getStatusColor(order.orderStatus),
                                borderRadius: '20px',
                                padding: '6px 12px',
                                fontWeight: '500',
                                minWidth: '160px',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="Food Preparing" style={{ backgroundColor: '#1a1a1a', color: '#f5a623' }}>Food Preparing</option>
                              <option value="Out for delivery" style={{ backgroundColor: '#1a1a1a', color: '#3399cc' }}>Out for delivery</option>
                              <option value="Delivered" style={{ backgroundColor: '#1a1a1a', color: '#4caf50' }}>Delivered</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                    {data.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            <i className="bi bi-inbox" style={{ color: '#2a2a2a' }}></i>
                          </div>
                          <h4 style={{ color: '#8b8b8b' }}>No orders found.</h4>
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

export default Orders;