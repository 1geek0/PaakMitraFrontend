import React from "react";
import {Card} from "@mui/material";
import {Flex} from "@chakra-ui/react";

const RecipeCard = function (props: { name: string, link: string, image: string, calories: number, timeToCook: number }) {
  return (
    <Card elevation={8} raised={true}
          style={{padding: '8px', margin: '8px', borderColor: 'black', borderWidth: '1px'}}>
      <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <img style={{borderRadius: '4px'}} alt={'recipe'} width={'200'} height={'200'} src={props.image}/>
        <h1>{props.name}</h1>
        <h2><span style={{fontWeight: 'bold'}}>Calories</span>:{props.calories.toFixed(0)}</h2>
        <h2><span style={{fontWeight: 'bold'}}>Time to cook</span>:{props.timeToCook.toFixed(0)} minutes</h2>
        <a style={{color: 'teal', alignSelf: 'end', paddingRight: '8px'}} href={props.link} target={'_blank'} rel="noreferrer">Go To Full Recipe</a>
      </Flex>
    </Card>)
}


export default RecipeCard