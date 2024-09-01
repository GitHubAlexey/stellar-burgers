import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  changeIngredientsOrder,
  removeIngredient
} from '../../slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMove = (direction: 'up' | 'down') => {
      dispatch(changeIngredientsOrder({ move: direction, index }));
    };

    const handleRemove = () => {
      dispatch(removeIngredient({ ...ingredient, index }));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={() => handleMove('up')}
        handleMoveDown={() => handleMove('down')}
        handleClose={handleRemove}
      />
    );
  }
);
