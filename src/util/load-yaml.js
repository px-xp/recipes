import { promises as fs } from 'fs';
import path from 'path';
const yaml= require("js-yaml");

let recipes = void 0
export async function getRecipes() {
    if (recipes !== void 0) {
        return recipes
    }

    const recipesDirectory = path.join(process.cwd(), 'recipes')
    const filenames = await fs.readdir(recipesDirectory)

    recipes = filenames.reduce((async function(acc, filename) {
        const filePath = path.join(recipesDirectory, filename)
        const recipesJSON = yaml.load(await fs.readFile(filePath, 'utf8'), 'utf-8')
        recipesJSON.recipes.forEach(recipe => {
            acc.push(
                recipe
            )
        })

        return acc
    }), [])

    return recipes
}