# hack-zurich-2022

## AI Part 

### Dataset:
* Our dataset is composed of 30 features coming for sensors during 486 days between 02.05.2021 and 31.08.2022. The features are between temperature in/outdoors and air components in two different rooms. Room A which is a canteen and room B is located on the rooftop terrace of the building.
### Problem definition:
* Our target is to predict the CO2 using the other sensors reading so we will have a vision in any room for the future events 

### Preprossing:
* First, we started to drop the null values from the sensor and did some cleaning processing approaches then we restructured the dataset by combined all to have in the end room A and room B to be independent.
### Modeling:
* We are proposing Random Forest algorithm. It is a supervised learning algorithm which is an ensemble of decision trees,and trained with the “bagging” method.
* So we chose this algorithm because it's automatically eliminate the useless features so we do not have an overfitting.
### Evaluation:
* After the training process, we tested the model to have an error -/+ 100 ppm. it means when we want to predict CO2 using other sensors reading, the error of the predicted CO2 will be between -/+ 100 ppm.

## Members

* Vanessa Eberhard
* Sarah Elmasry
* Bolatbek Minbayev
* Joan Farres
