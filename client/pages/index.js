// Tools

import { useState } from 'react';

// UI
import { Recipes, Recipe, TransitionsModal } from '@/components';
import App from '@/layouts/app';


export default function home() {

    const [recipeID, setRecipeID] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenRecipe = (v) => {
        setRecipeID(v);
        setIsModalOpen(true);
    }

    const onClose = (v) => {
        setRecipeID(null);
        setIsModalOpen(false);
    }

    return (
        <App>
            <TransitionsModal isOpen={isModalOpen} onClose={onClose}>
                <Recipe recipe={recipeID} />
            </TransitionsModal>
            <h1>Recipes</h1>
            <Recipes openRecipe={(v) => handleOpenRecipe(v)} />
        </App>
    )
}