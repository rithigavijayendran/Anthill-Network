import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPaypal, error: errorPaypal } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": paypal.clientId, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid && !window.paypal) {
        loadPaypalScript();
      }
    }
  }, [errorPaypal, loadingPaypal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order.create({ purchase_units: [{ amount: { value: order.totalPrice } }] }).then((orderID) => orderID);
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="ml-[4rem] container mx-auto p-6 flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        {order.orderItems.length === 0 ? (
          <Message>Order is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-center">Unit Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline">{item.name}</Link>
                    </td>
                    <td className="p-3 text-center">{item.qty}</td>
                    <td className="p-3 text-center">₹{item.price.toFixed(2)}</td>
                    <td className="p-3 text-right">₹{(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="md:w-1/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Name:</strong> {order.user.username}</p>
          <p><strong>Email:</strong> {order.user.email}</p>
          <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Not paid</Message>}
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Cost Breakdown</h3>
          <div className="flex justify-between">
            <span>Items</span>
            <span>₹{order.itemsPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{order.shippingPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{order.taxPrice}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{order.totalPrice}</span>
          </div>
        </div>

        {!order.isPaid && (
          <div className="mt-6">
            {loadingPay && <Loader />}
            {isPending ? <Loader /> : (
              <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
            )}
          </div>
        )}

        {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" onClick={deliverHandler}>Mark As Delivered</button>
        )}
      </div>
    </div>
  );
};

export default Order;