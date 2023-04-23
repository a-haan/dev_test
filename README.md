# Binary Vision Dev Test

This exercise forms part of our interview process. It's a way for you to show
your skills as a developer and ability to work with an existing code base.

## Test

The test consists of a simple react app that should display the exoplanets
discovered by TESS in 2022.  
The data source for this can be found at https://binary-vision.s3.eu-west-2.amazonaws.com/discoveries.json

We want this data to be pulled in and displayed.  
This can be a table or any other way you think is approriate.

The main pieces of info we want to see is:  
Planet Name: `pl_name`  
Release date: `releasedate`  
Planet radius (earth units): `pl_rade`

The data should be sorted by `releasedate`

This can be displayed on the home page below the existing text or on a new page,
up to you. Something that fits in line with existing styling, but do also include some 'pretty bits' that you feel fits in with the general look and feel.

## Running

To run this app you will need `nodejs` and `yarn`.  
Run `yarn` in this folder to install the dependencies and `yarn start` to start the app.

## Notes

I have added NextJS to the project as I think it is a great tool for building React apps, I used TailWindCSS for styling as I think it is a great tool for quickly building out a UI. I have also added a few other packages that I think are useful for building React apps.

I opted to use TypeScript as I think it is a great tool for building large-scale React apps, it also helps with code completion and type checking.

I used redux for state management and utilised redux-toolkit to help with creating the store and reducers. I used redux thunks to handle async actions, such as managing local storage for saving your favourite planets.

I used the data source provided but I also cross-referenced the data with the NASA Exoplanet Archive API to get more information about the planets. I used this data to display the planet's radius in Earth units and also to display the planet's image.

## Vercel Deployment

https://dev-test-seven.vercel.app

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
