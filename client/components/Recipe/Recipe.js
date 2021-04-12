import { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));


export function Recipe({ recipe }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };
    const [special, setSpecial] = useState(null)

    useEffect(async () => {
        const res = await fetch(`http://localhost:3001/specials`)
        const specials = await res.json()
        
        recipe?.ingredients.map(ingredient => {
            specials.filter(special => {
                if(special.ingredientId === ingredient.uuid) {
                    setSpecial(special)
                }
            })
        })
    }, [])

    console.log(special);

    return (
        <Card className={classes.root}>
            <CardHeader
                title={recipe?.title}
                subheader={recipe?.postDate}
            />
            <CardMedia
                className={classes.media}
                image={`http://localhost:3001/${recipe?.images?.full}`}
                title={recipe?.title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {recipe?.description}
                </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
                <strong>Servings:</strong> {recipe?.servings}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <strong>Preparation time:</strong> {recipe?.prepTime} {recipe?.prepTime > 1 ? 'minutes' : 'minute'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <strong>Cook time:</strong> {recipe?.cookTime} {recipe?.cookTime > 1 ? 'minutes' : 'minute'}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Ingredients:</Typography>
                    <ul>
                        {
                            recipe?.ingredients.map(ingredient => {
                                const { amount, measurement, name } = ingredient;
                                return (
                                    <>
                                        <li>
                                            <p>{amount} {measurement} {name}</p>

                                            {
                                                // speciaaaaaaaaaaaaaaal
                                                (ingredient?.uuid === special?.ingredientId) && (
                                                    <>
                                                        <p><strong>{special.title}</strong> <em>({special.type})</em> - {special.text}</p>
                                                    </>
                                                )
                                            }
                                        </li>
                                    </>
                                )
                            })
                        }
                    </ul>
                    <Typography gutterBottom variant="h5" component="h2">Directions:</Typography>
                    <ul>
                        {
                            recipe?.directions.map(direction => {
                                return (
                                    <li><p>{direction.instructions} {!!direction.optional && <em>(optional)</em>}</p></li>
                                )
                            })
                        }
                    </ul>
                </CardContent>
            </Collapse>
        </Card>
    )
}