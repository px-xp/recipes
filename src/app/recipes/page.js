import {getRecipes} from "@/util/load-yaml";
import Link from 'next/link'


export default async function Page(props) {
    const recipes = await getRecipes();

    return (<>
    <h1>Recipes</h1>
        {recipes.map((recipe, index) => {
            return <>
                <Link key={index} href={`recipes/${recipe.id}`}>{recipe.title}</Link>
                <br/>
            </>
        })}
    </>)
}