import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    Text,
    Image,
    AsyncStorage,
    ScrollView,
    ActivityIndicator,
    Modal,
    Dimensions,
    Picker
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const data = require('../Dummy/Matches');

var widthD = Dimensions.get('window').width;
var heightD = Dimensions.get('window').height;
let h_ = heightD / 2

Props = {};
class MainScreen extends Component<Props> {

  static navigationOptions={
    headerStyle: {
      backgroundColor: '#009432'
    },
    title: 'Powerplay'
  };

  constructor(props) {
    super(props);
     this.state={ 
        sport: 'Cricket',
        ahem: 'Select Sport',
        trigger: true,
        tab: true,
        currentPage: 1,
        incomeMatch: {},
        matchArray: []
     };
  };

  componentWillMount() {
    // var paytmdetails = {
    //   generationUrl: "http://13.127.217.102:8000/payment/initiatePayment",
    //   validationUrl: "http://13.127.217.102:8000/paymnet/paytmResponse",
    //   mid: "Powerp53888329068377", // Prod
    //   industryType: "Retail", //Prod
    //   website: "APPSTAGING", //prod
    //   channel: "WAP",
    //   amount: "5",
    //   orderId: "bd81545637220384",
    //   requestType: "DEFAULT",
    //   email: "arpitshukla2013@gmail.com",
    //   phone: "7777777777",
    //   theme: null,
    //   custId: "9988344556",
    // }
    // paytm.startPayment(paytmdetails);
    var d
    var request= {}
        request['start'] = 0;
        request['maxResults'] = 25;

    fetch('http://13.127.217.102:8000/getFutureMatches',{
  method: 'POST',
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(request),
})
    .then((res)=> res.json())
    .then((responseJson)=> {
      this.setState({ incomeMatch: responseJson,
                      matchArray: responseJson.matches });
    });
  }

  goThrough() {
    this.props.navigation.navigate('MainScreen');
  }

  secondsToString( timeRemaining ) {
    // timeRemaining = timeRemaining / 1000000
    var date = String(new Date(timeRemaining));
    return date;
    // alert(date)
    // return (setInterval(()=> {
    //       this.calculate(date)
    //     }, 1000));
  }

  calculate(timeRemaining) {
    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);
      
      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);
      
      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);
      
      seconds = parseInt(timeRemaining);
      
      return (parseInt(days, 10) + " " + ("0"+hours).slice(-2) + " " + ("0"+minutes).slice(-2) + " " + ("0"+seconds).slice(-2));
    } 
    else {
      return;
    }
  }

  truncate(string) {
      if (string.length >= 10) return string.substring(0, 10) + '...';
      else return string;
  }

  renderMatches() {
    return this.state.matchArray.map((match, idx)=> {
      return (<View key= {idx} style= {{ width: widthD-30, backgroundColor: '#ecf0f1', elevation: 4, height: 150, margin: 5}}> 
              <TouchableOpacity key = {idx} style={styles.touchMatch}
                onPress= {()=> this.props.navigation.navigate('Contests', { data: match, contestDetails: this.state.incomeMatch })}
              >
                  <Text key = {idx} style= {styles.teamText}>
                    {match.type}
                  </Text>
                  <View key = {idx} style= {{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Entypo key = {idx} name= "flag" color= "red" size= {14} style= {{alignSelf: 'center'}} />
                    <Text key = {idx} style= {styles.teamText}>
                      {this.truncate(match.team1)}
                    </Text>
                    <Text key ={idx} style= {styles.teamText}>
                      Vs.
                    </Text>
                    <Text key ={idx} style= {styles.teamText}>
                      {this.truncate(match.team2)}
                    </Text>
                    <Entypo key = {idx} name= "flag" color= "red" size= {14} style= {{alignSelf: 'center'}} />
                  </View>
                  <View key = {idx} style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Entypo key= {idx} name= "clock" size= {16} color= "green" style={{alignSelf: 'center'}} />
                    <Text key={idx}>{this.secondsToString(match.startTime)}</Text>
                  </View>
              </TouchableOpacity>
              </View>);
    })
  }

    render() {
      // var a = this.state.incomeMatch.matches
      // alert(JSON.stringify(this.state.incomeMatch));
      const holdIt = (  <View style= {{width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                          <TouchableOpacity style={styles.submitButton} onPress= {()=> this.setState({ trigger: false })}>
                              <Text style={styles.submitButtonText}>Cricket</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.submitButton} onPress= {()=> this.setState({ trigger: false })}>
                              <Text style={styles.submitButtonText}>Football</Text>
                          </TouchableOpacity>
                        </View>
        );
        return (
          <View style={{flex:1, backgroundColor: 'white', flexDirection: 'column', width: '100%', alignItems: 'center'}}>       
          <View style= {styles.innerContainer}>
            
            <View style= {styles.pickerView}>
              <TouchableOpacity onPress= {()=> this.setState({ tab: true })} 
                style= {!this.state.tab ? styles.tabButtonDown : styles.tabButton}> 
                <Text>             
                  Cricket
                </Text>             
              </TouchableOpacity>

              <TouchableOpacity onPress= {()=> this.setState({ tab: false })} 
                style= {this.state.tab ? styles.tabButtonDown : styles.tabButton}>              
                <Text>             
                  Football
                </Text>
              </TouchableOpacity>              
            </View>

            <View style= {{ marginTop: 2, width: '98%', height: 2, backgroundColor: 'green'}}>
            </View>

            <View style= {styles.pickerView}>
              <TouchableOpacity 
                style= {styles.tabButtonDownBelow}> 
                <Text>             
                  Upcoming
                </Text>             
              </TouchableOpacity>

              <TouchableOpacity 
                style= {styles.tabButtonDownBelow}> 
                <Text>             
                  Live
                </Text>             
              </TouchableOpacity>

              <TouchableOpacity 
                style= {styles.tabButtonDownBelow}> 
                <Text>             
                  Completed
                </Text>             
              </TouchableOpacity>              
            </View>
              <ScrollView showsVerticalScrollIndicator= {false}>
                {
                  this.renderMatches()
                }
              </ScrollView>

            </View>

               
        </View>
    );
  }
}

const styles = StyleSheet.create({
    innerContainer: {
        flex : 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelHandle: {
      backgroundColor: '#f1f2f6',
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
      width: '60%'
    },
    matchView: {
      width: '100%',
      height: '25%',
      borderColor: 'red',
      borderWidth: 2,
      borderRadius: 2,
    },
    submitButtonText: { 
      color: 'red', 
      fontWeight: 'bold', 
      textAlign: 'center'
    },
    submitButton: {
      margin: 10,
      backgroundColor: 'white', 
      width : '60%',
      height: 50,
      elevation : 2,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4
    },
    touchMatch: {
      width: widthD - 40,
      height: 140,
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 2,
      backgroundColor: 'white',
      margin: 5
    },
    teamText: {
      fontSize: 18,
      alignSelf: 'center',
      fontWeight: 'bold',
      margin: 8
    },
    scrollView: {
      flex: 1,
      width: '100%',
      height: '25%'
    },
    matchRenderer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '98%'
    },
    pickerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center'
    },
    picker: {
      width: '80%',
      borderColor: 'red',
      borderWidth: 2,
      height: 50,
    },
    tabButton: { 
      width: '50%', 
      height: 40, 
      padding: 4, 
      elevation: 4, 
      backgroundColor: '#7bed9f', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    tabButtonDown: {
      width: '50%', 
      height: 40, 
      padding: 4, 
      elevation: 4, 
      backgroundColor: '#dcdde1', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    tabButtonDownBelow: {
      width: widthD / 3, 
      height: 30, 
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderLeftWidth: 2,
      justifyContent: 'center', 
      borderColor: '#7bed9f',
      alignItems: 'center'
    }
});

export default MainScreen;