// Tools
import { useEffect, useState } from 'react';

// UI
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: '100%',
        height: 600,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export function Recipes({ openRecipe }) {
    const classes = useStyles();
    const [recipes, setRecipes] = useState(null)

    useEffect(async () => {
        const res = await fetch(`http://localhost:3001/recipes`)
        const data = await res.json()
        setRecipes(data)
    }, [])

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                {
                    !recipes ? (
                        'Loading...'
                    ) : (
                        recipes?.map((recipe) => (
                            <GridListTile key={recipe.uuid}>
                                <img src={`http://localhost:3001/${recipe.images.medium}`} alt={recipe.title} />
                                <GridListTileBar
                                    title={recipe.title}
                                    subtitle={<span>{recipe.description}</span>}
                                    actionIcon={
                                        <IconButton onClick={() => openRecipe(recipe)} aria-label={`info about ${recipe.title}`} className={classes.icon}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))
                    )
                }
            </GridList>
        </div>
    )
}