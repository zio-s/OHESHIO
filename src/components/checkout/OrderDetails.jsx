import InputCustom from '../../ui/InputCustom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/modules/cartSlice';
import { checkoutActions } from '../../store/modules/checkoutSlice';
import { useState } from 'react';
import { useEffect } from 'react';

const OrderDetails = () => {
  const {
    discountType,
    discountValue,
    discountError,
    discountSuccess = false,
  } = useSelector((state) => state.checkoutR);
  const { subtotal, shipping, discount, total, totalQuantity } = useSelector((state) => state.cartR);
  const cartItems = useSelector((state) => state.cartR.items);
  const dispatch = useDispatch();

  // 할인 코드 입력
  const [discountCode, setDiscountCode] = useState('');

  const handleApplyDiscount = () => {
    dispatch(checkoutActions.applyDiscountCode({ code: discountCode, total: total }));
  };

  const handleClearDiscount = () => {
    setDiscountCode('');
    dispatch(checkoutActions.clearDiscountCode());
  };

  useEffect(() => {
    if (discountType === 'percentage' && discountValue > 0) {
      dispatch(
        cartActions.setDiscount({
          type: 'percentage',
          value: discountValue,
          subtotal: subtotal,
        })
      );
    } else {
      dispatch(
        cartActions.setDiscount({
          type: null,
          value: 0,
          subtotal: subtotal,
        })
      );
    }
  }, [discountType, discountValue, subtotal, dispatch]);

  return (
    <>
      <div
        className="border border-secondary-500 rounded-lg py-10 px-5 xl:px-10"
        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <h2 className="text-2xl text-center font-semibold text-gray-700">Order Details</h2>
        <div className="flex flex-col gap-5 mt-10">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative w-[20%] min-w-16 max-w-16 bg-gray-100 rounded-lg border border-gray-200">
                <img src={item.image} alt={item.name} className="block aspect-square object-cover" />
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-gray-800/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 flex justify-between items-baseline gap-2">
                <div>
                  <strong className="block text-sm font-normal lg:mb-1">{item.name}</strong>
                  <div className="text-xs text-gray-400">
                    <span>{item.color}</span>
                    <span className="px-1">/</span>
                    <span>{item.size}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm">
                    <span className="mr-0.5">₩</span>
                    {item.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-4 mt-8">
          <div className="w-full">
            <InputCustom
              placeholder="Discount code"
              className="font-mono !border !border-solid h-12 bg-white text-sm"
              value={discountCode}
              error={discountError}
              onChange={(e) => setDiscountCode(e.target.value)}
              success={discountSuccess}
            />
          </div>
          {!discountSuccess ? (
            <button
              type="button"
              className="py-3 px-4 h-12 rounded bg-secondary-100 text-gray-500 hover:bg-primary-500 hover:text-gray-50 duration-200 flex-shrink-0 text-sm border border-solid"
              onClick={handleApplyDiscount}
            >
              Apply
            </button>
          ) : (
            <button
              type="button"
              className="py-3 px-4 h-12 rounded bg-primary-500 text-gray-50 duration-200 flex-shrink-0 text-sm border border-solid"
              onClick={handleClearDiscount}
            >
              Clear
            </button>
          )}
        </div>
        <div className="mt-8">
          <div className="text-sm space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal · {totalQuantity} items</span>
              <span>
                <span className="mr-0.5">₩</span>
                {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>
                <span className="mr-0.5">+ ₩</span>
                {shipping.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>
                <span className="mr-0.5">- ₩</span>
                {discount.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xl font-semibold mt-5">
            <span>Total</span>
            <span>
              <span className="text-sm font-light text-secondary-400 mr-2">KRW</span>
              <span className="mr-0.5">₩</span>
              {total.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="text-sm text-secondary-400 !mt-5">
          <p className="flex items-center justify-between font-korean">
            주문 내용을 확인했으며, 결제에 동의합니다.
            <button className="underline font-korean">보기</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
