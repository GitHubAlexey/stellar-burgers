import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  const { ingredients, loading, error } = useSelector(
    (state) => state.ingredients
  );

  const getIngredientsByType = (type: string) =>
    ingredients?.filter((ingredient) => ingredient.type === type) || [];

  const buns = getIngredientsByType('bun');
  const mains = getIngredientsByType('main');
  const sauces = getIngredientsByType('sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const refs = {
    bun: useRef<HTMLHeadingElement>(null),
    main: useRef<HTMLHeadingElement>(null),
    sauce: useRef<HTMLHeadingElement>(null)
  };

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewMains) setCurrentTab('main');
  }, [inViewBuns, inViewMains, inViewSauces]);

  const onTabClick = (tab: TTabMode) => {
    setCurrentTab(tab);
    refs[tab]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabClick: (val: string) => void = (val) => {
    onTabClick(val as TTabMode);
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={refs.bun}
      titleMainRef={refs.main}
      titleSaucesRef={refs.sauce}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={handleTabClick}
    />
  );
};
