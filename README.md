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
