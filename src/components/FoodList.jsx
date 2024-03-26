import "./FoodList.css";

export const FoodList = ({food, title}) => {
  return (
    <div className='food-list'>
        <h2>{title}</h2>
        { food.map( (item) => (
            <div className="food-preview" key={item.id}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
            </div>
        ))}
    </div>
  )
}
