import React, { Component } from "react";
import ExerciseType from "../../components/Accordion/Accordion.js";
import CollapseItem from "../../components/Accordion/Collapse.js";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import ExerciseItem from "../../components/Form/ExerciseItem";
import ModalExample from "../../components/Modal/Modal.js";
import Input from "../../components/Form/Input";
import FormBtn from "../../components/Form/FormBtn.js";
import LoadingSpinner from "../../components/Loading/Spinner.js";


class Exercises extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeArray: ["Cardio", "Olympic Weight Lifting", "Powerlifting", "Strength", "Stretching"],
      strengths: [],
      stretches: [],
      olympics: [],
      cardios: [],
      powerliftings: [],
      strengthsMuscles: [],
      stretchesMuscles: [],
      olympicsMuscles: [],
      cardiosMuscles: [],
      powerliftingsMuscles: [],
      popoverOpen: false, //still need this?
      workoutName: "",
      selectedExercise: "",
      selectedExercises: [],
      workout: [],
      loading: true,
      strengthsClicked: false,
      stretchesClicked: false,
      olympicsClicked: false,
      cardiosClicked: false,
      powerliftingsClicked: false,
      reps: ""
    }
    this.btn = React.createRef();
  };
  //need an onClick Function to toggle collapses

  componentDidMount() {

    //this.typeExercises();
  }



  loadExercises = (type) => {
    console.log("got triggered");
    API.getExercises({ Type: type })
      .then(
        res => {

          this.setState({
            exercises: res.data,
            workoutName: "",
            selectedExercise: "",
            selectedExercises: [],
          })
          console.log("results:", res.data);
          this.sortExerciseTypes();
        }
      )
      .catch(err => console.log("Exercise Error:", err));
  };
  //creates list of muscle groups by type
  sortMuscles = () => {
    const strengthMuscles = [];
    const stretchMuscles = [];
    const olympicMuscles = [];
    const cardioMuscles = [];
    const powerliftingMuscles = [];
    this.state.strengths.forEach(element => {

      if (strengthMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        strengthMuscles.push(element.Main_Muscle_Group);
      }
    })
    this.state.stretches.forEach(element => {
      if (stretchMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        stretchMuscles.push(element.Main_Muscle_Group);
      }
    })
    this.state.olympics.forEach(element => {
      if (olympicMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        olympicMuscles.push(element.Main_Muscle_Group);
      }
    })
    this.state.cardios.forEach(element => {
      if (cardioMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        cardioMuscles.push(element.Main_Muscle_Group);
      }
    })
    this.state.powerliftings.forEach(element => {
      if (powerliftingMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        powerliftingMuscles.push(element.Main_Muscle_Group);
      }
    })
    this.setState({
      strengthsMuscles: strengthMuscles,
      stretchesMuscles: stretchMuscles,
      olympicsMuscles: olympicMuscles,
      cardiosMuscles: cardioMuscles,
      powerliftingsMuscles: powerliftingMuscles
    })
  }

  //pushes the exercise id & name into an array upon clicking the save button
  saveExercise = (result) => {
    console.log("saveExercise Result:", result);
    let reps = prompt(`How many Reps of ${result.Name}`, "10");
    if (reps === null || reps === "") {
      alert("Reps must be specified!");
    } else {
      const newExercise = {
        name: result.Name,
        main_Muscle_Group: result.Main_Muscle_Group,
        detailed_Muscle_Group: result.Detailed_Muscle_Group,
        other_Muscle_Groups: [result.Other_Muscle_Groups],
        type: result.Type,
        mechanics: result.Mechanics,
        equipment: [result.Equipment],
        difficulty: result.Difficulty,
        description: [result.Description],
        instructions: [result.Instructions],
        tips: [result.Tips],
        reps: reps,
        id: result._id
      };
      console.log("saveExercise New:", newExercise);
      const workoutName = this.state.workoutName;

      if (workoutName === "") {
        let newWorkout = prompt("What do you want to Call New Workout?", "New Workout");
        if (newWorkout === null || newWorkout === "") {
          alert("Workout must be named!");
        } else {

          const selectedExercise = { name: newExercise.name, exercise: newExercise.id, reps: newExercise.reps };

          this.setState({
            selectedExercises: [...this.state.selectedExercises, selectedExercise],
            workoutName: newWorkout
          });
          console.log("State of selectedExercises in saveExercise: ", this.state.selectedExercises);
        }
      } else {

        const selectedExercise = { name: newExercise.name, exercise: newExercise.id, reps: newExercise.reps };

        this.setState({
          selectedExercises: [...this.state.selectedExercises, selectedExercise]
        });
      };
    }
  }
  formatWorkout = () => {
   // console.log("Selected:", this.state.selectedExercises);
    const tempArr = []
   // this.state.selectedExercises.forEach(exercise => {
   //   
   //   console.log("TempARR: ", tempArr);
   // })
   // this.setState({
   //   workout: [tempArr]
   // }, this.saveWorkout(tempArr));

this.state.selectedExercises.map(exercise => {
  console.log("exercise", exercise);
  tempArr.push(exercise);
} )
    console.log("WORKOUT: ", tempArr);

  }
  saveWorkout = () => {
    this.formatWorkout();
    console.log("saving?", this.state.selectedExercises);
    API.saveWorkout({
      Name: this.state.workoutName,
      Exercises: this.state.selectedExercises,
      Dates: []
    }).catch(err => console.log("WorkoutDb: ", err));
  };
  deleteExercise = id => {
    //switch this function to make it so if you add multiple of an exercise you have to click remove on each one.
    console.log("State of selectedExercises in deleteExercise: ", this.state.selectedExercises);
    const clickedExercise = this.state.selectedExercises.filter(selectedExercise => selectedExercise.exercise !== id);

    this.setState({ selectedExercises: clickedExercise });
    console.log("After Delete Button: ", this.state.selectedExercises);
  };

  btnUnclick = () => {

    this.setState({
      isButtonDisabled: false
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(value);
  };

  repChange = event => {
    const value = event.target;
    this.setState({
      reps: value
    });
    console.log(value);
  };

  accordionClick = event => {

    const { name, value } = event.target;

    switch (value) {
      case "Cardio":
        if (this.state.cardiosClicked === false) {
          API.getExercises(value)
            .then(
              res => {
                console.log("type Results", res.data);
                const cardios = res.data;
                this.setState({
                  cardios: cardios,
                  cardiosClicked: true
                });
                this.sortMuscles();
              }).catch(err => console.log(err));

        }
        break;
      case "Olympic Weight Lifting":
        if (this.state.olympicsClicked === false) {
          API.getExercises(value)
            .then(
              res => {
                console.log("type Results", res.data);
                const olympics = res.data;
                this.setState({
                  olympics: olympics,
                  olympicsClicked: true
                });
                this.sortMuscles();
              }).catch(err => console.log(err));
        }
        break;
      case "Powerlifting":
        if (this.state.powerliftingsClicked === false) {
          API.getExercises(value)
            .then(
              res => {
                console.log("type Results", res.data);
                const powerliftings = res.data;
                this.setState({
                  powerliftings: powerliftings,
                  powerliftingsClicked: true
                });
                this.sortMuscles();
              }).catch(err => console.log(err));
        }
        break;
      case "Strength":
        if (this.state.strengthsClicked === false) {
          API.getExercises(value)
            .then(
              res => {
                console.log("type Results", res.data);
                const strengths = res.data;
                this.setState({
                  strengths: strengths,
                  strengthsClicked: true,
                  loading: false
                });
                this.sortMuscles();
              }).catch(err => console.log(err));
        }
        break;
      case "Stretching":
        if (this.state.stretchesClicked === false) {
          API.getExercises(value)
            .then(
              res => {
                console.log("type Results", res.data);
                const stretches = res.data;
                this.setState({
                  stretches: stretches,
                  stretchesClicked: true
                });
                this.sortMuscles();
              }).catch(err => console.log(err));
        }
        break;

    }
  };


  render() {
    const { strengths, loading } = this.state;
    return (
      <Container fluid>
        <Row>

          <Col size="md-3 sm-12">

            <ModalExample
              buttonLabel="Button" />
            <div className="accordion" id="accordionExample">

              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button name="Type" value="Cardio" className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={this.accordionClick}>
                      Cardio
                    </button>
                  </h5>
                </div>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">

                  <div className="card-body">
                    <ul>

                      {this.state.cardiosMuscles.map(cardio => (
                        <ExerciseType
                          key={cardio.replace(/\s/g, '') + "Type"}
                          id={cardio.replace(/\s/g, '') + "Type"}
                          group={cardio}
                        >
                          {this.state.cardios.map(cardios => (
                            <CollapseItem
                              key={cardios._id}
                              id={cardios._id}
                              name={cardios.Name}
                              otherMuscleGroups={cardios.Other_Muscle_Groups}
                              detailedMuscleGroup={cardios.Detailed_Muscle_Group}
                              equipment={cardios.Equipment}
                              difficulty={cardios.Difficulty}
                              data={cardios}
                              repChange={this.repChange}
                              saveExercise={this.saveExercise}
                            />))}
                        </ExerciseType>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button name="Type" value="Olympic Weight Lifting" className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" onClick={this.accordionClick}>
                      Olympic Weight Lifting
                    </button>
                  </h5>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      {this.state.olympicsMuscles.map(olympic => (
                        <ExerciseType
                          key={olympic.replace(/\s/g, '') + "Type"}
                          id={olympic.replace(/\s/g, '') + "Type"}
                          group={olympic}
                        >
                          {this.state.olympics.map(olympics => (
                            <CollapseItem
                              key={olympics._id}
                              id={olympics._id}
                              name={olympics.Name}
                              otherMuscleGroups={olympics.Other_Muscle_Groups}
                              detailedMuscleGroup={olympics.Detailed_Muscle_Group}
                              equipment={olympics.Equipment}
                              difficulty={olympics.Difficulty}
                              data={olympics}
                              repChange={this.repChange}
                              saveExercise={this.saveExercise}

                            />))}
                        </ExerciseType>

                      ))}
                    </ul>
                  </div>
                </div>
              </div>


              <div className="card">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button name="Type" value="Powerlifting" className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree" onClick={this.accordionClick}>
                      Powerlifting
                    </button>
                  </h5>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      {this.state.powerliftingsMuscles.map(powerlifting => (
                        <ExerciseType
                          key={powerlifting.replace(/\s/g, '') + "Type"}
                          id={powerlifting.replace(/\s/g, '') + "Type"}
                          group={powerlifting}
                        >
                          {this.state.powerliftings.map(powerliftings => (
                            <CollapseItem
                              key={powerliftings._id}
                              id={powerliftings._id}
                              name={powerliftings.Name}
                              otherMuscleGroups={powerliftings.Other_Muscle_Groups}
                              detailedMuscleGroup={powerliftings.Detailed_Muscle_Group}
                              equipment={powerliftings.Equipment}
                              difficulty={powerliftings.Difficulty}
                              data={powerliftings}
                              repChange={this.repChange}
                              saveExercise={this.saveExercise}

                            />))}
                        </ExerciseType>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingFour">
                  <h5 className="mb-0">
                    <button name="Type" value="Strength" className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour" onClick={this.accordionClick}>
                      Strength
                    </button>
                  </h5>
                </div>
                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                  <div className="card-body">
                    {loading ? (<LoadingSpinner />) : (
                      <ul>

                        {this.state.strengthsMuscles.map(strength => (

                          <ExerciseType
                            key={strength.replace(/\s/g, '') + "Type"}
                            id={strength.replace(/\s/g, '') + "Type"}
                            group={strength}
                          >
                            {this.state.strengths.map(strengths => (
                              <CollapseItem
                                key={strengths._id}
                                name={strengths.Name}
                                id={strengths._id}
                                otherMuscleGroups={strengths.Other_Muscle_Groups}
                                detailedMuscleGroup={strengths.Detailed_Muscle_Group}
                                equipment={strengths.Equipment}
                                difficulty={strengths.Difficulty}
                                data={strengths}
                                repChange={this.repChange}
                                saveExercise={this.saveExercise}

                              />))}
                          </ExerciseType>
                        ))}


                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingFive">
                  <h5 className="mb-0">
                    <button name="Type" value="Stretching" className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive" onClick={this.accordionClick}>
                      Stretches
                    </button>
                  </h5>
                </div>
                <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      {this.state.stretchesMuscles.map(stretch => (

                        <ExerciseType
                          key={stretch.replace(/\s/g, '') + "Type"}
                          id={stretch.replace(/\s/g, '') + "Type"}
                          group={stretch}
                        >
                          {this.state.stretches.map(stretches => (
                            <CollapseItem
                              key={stretches._id}
                              id={stretches._id}
                              data={stretches}
                              name={stretches.Name}
                              otherMuscleGroups={stretches.Other_Muscle_Groups}
                              detailedMuscleGroup={stretches.Detailed_Muscle_Group}
                              equipment={stretches.Equipment}
                              difficulty={stretches.Difficulty}
                              saveExercise={this.saveExercise}
                              repChange={this.repChange}

                            >

                            </CollapseItem>



                          ))}
                        </ExerciseType>

                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div >
          </Col >
          <Col size="md-6">
            <div>
              {!this.state.workoutName ? (
                <h1 className="text-center">Choose an Exercise to Begin</h1>

              ) : (


                  <div className="card">
                    <Input
                      name={this.state.workoutName}
                    />

                    {this.state.selectedExercises.map(exercise => (
                      <ExerciseItem
                        key={exercise.exercise}
                        id={exercise.exercise}
                        name={exercise.name}
                        reps={exercise.reps}
                        deleteExercise={this.deleteExercise}
                      />
                    ))}
                    <FormBtn
                      saveWorkout={this.saveWorkout}
                    />
                  </div>

                )}
            </div>

          </Col>
          <Col size="md-3">
          </Col>
        </Row >
      </Container >
    );
  }
}

export default Exercises;
