import Link from 'next/link';
import { Category } from '../../models/Category';
import CategoryBreadcrumb from '../../components/Navigation/CategoryBreadcrumb';
import { getCategoryChildrenByCcid } from '../../helpers/CategoriesDataHelper';

type CategoryHeroProps = {
  category: Category;
};

const CategoryHero = ({ category }: CategoryHeroProps): JSX.Element => {
  if (!category) {
    return null;
  }

  const categoryDisplayName = category.title ? category.title : category.name;

  return (
    <section className="category-hero">
      <CategoryBreadcrumb category={category} />
      <div className="category-hero-container">
        <div className="category-hero-content">
          <h1>{categoryDisplayName}</h1>
          <p>{category.desc}</p>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
