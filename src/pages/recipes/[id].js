import {getRecipes} from "@/util/load-yaml";

export default function Page({ recipe, params }) {
    const title = recipe.title;
    const description = recipe.description;
    const serving_size = recipe.serving_size;
    const ingredients = recipe.ingredients;
    const steps = recipe.steps;
    const macros = recipe.macros;
    const cook_time = recipe.cook_time;
    const prep_time = recipe.prep_time;

    return (<>
        <p className={'text-5xl font-bold font-serif'}>{title}</p>
        <br/>
        <p className={'text-xl'}>Description</p>
        <br/>
        <p>{description}</p>
        <br/>
        <div className={'flex flex-col'}>
            <div><span>Prep Time</span> {prep_time}</div>
            <div><span>Cook Time</span> {cook_time}</div>
        </div>
        <br/>
        <p className={'text-xl'}>Serving Size</p>
        <p>{serving_size}</p>
        <br/>
        <p className={'text-xl'}>Ingredients</p>
        <ul className={'list-disc list-inside'}>
            {ingredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
            ))}
        </ul>
        <br/>
        <p className={'text-xl'}>Steps</p>
        <ol className={'list-decimal list-inside'}>
            {steps.map((step) => (
                <li key={step.id}>{step.description}</li>
            ))}
        </ol>
        <br/>
        <p className={'text-xl'}>Nutrients</p>
        <p>Protein {macros.protein.amount} {macros.protein.unit}</p>
        <p>Carbs {macros.carbs.amount} {macros.carbs.unit}</p>
        <p>Fat {macros.fat.amount} {macros.fat.unit}</p>
    </>)
}

export async function getStaticProps({params}) {
    // Call an external API endpoint to get posts

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    const recipes = await getRecipes();
    const recipe = recipes.find((recipe) => recipe.id === +params.id);
    return {
        props: {
            recipe: recipe
        },
    }
}

export async function getStaticPaths() {
    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)

    const recipes = await getRecipes();
    const paths = recipes.map((recipe) => ({
        params: {
            id: recipe.id.toString()
        },
    }))

    return { paths, fallback: false }
}