import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import { resetConstructor } from '../../slices/burgerConstructorSlice';
import { addNewOrder } from '../../slices/feedSlice';
import { addOrder, clearOrderModalData } from '../../slices/orderSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../../services/store'; // Импортируйте тип состояния корня Redux

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderModalData, orderRequest } = useSelector(
    (state: RootState) => state.order
  );
  const { user } = useSelector((state: RootState) => state.user);
  const { bun, ingredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const handleOrder = () => {
    if (!bun || orderRequest) return;
    if (!user) return navigate('/login');

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ingredient: TIngredient) => ingredient._id),
      bun._id
    ];

    dispatch(addOrder(ingredientIds)).then(
      () => orderModalData && dispatch(addNewOrder(orderModalData))
    );
  };

  const handleCloseModal = () => {
    dispatch(resetConstructor());
    dispatch(clearOrderModalData());
    navigate('/', { replace: true });
  };

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={handleOrder}
      closeOrderModal={handleCloseModal}
    />
  );
};
