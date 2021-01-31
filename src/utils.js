export const getRecommendedOptions = (data) => {
    // Reader and Language
    let parentCounter = 0;
    let childCounter = 0;
    let engCounter = 0;
    let spnCounter = 0;
    
    const readingHistory = new Array(4);

    data.readerLanguage.map(item => {
      if(item === null) {
        for(let i = 0; i < data.readerLanguage.length; i++) {
          if(readingHistory[i] === undefined) {
            readingHistory[i] = null;
            break;
          }
        }
      } else if(item[0] === "parent") {
        parentCounter++;
        if(item[1] === "EN") {
          engCounter++;
        } else {
          spnCounter++;
        }
        for(let i = 0; i < data.readerLanguage.length; i++) {
          if(readingHistory[i] === undefined) {
            readingHistory[i] = item;
            break;
          }
        }
      } else {
        childCounter++;
        if(item[1] === "EN") {
          engCounter++;
        } else {
          spnCounter++;
        }
        for(let i = data.readerLanguage.length-1; i >= 0; i--) {
          if(readingHistory[i] === undefined) {
            readingHistory[i] = item;
            break;
          }
        }
      }
    })

    let numReqReadings = parentCounter + childCounter;

    return {
      parentCounter: parentCounter,
      childCounter: childCounter,
      engCounter: engCounter,
      spnCounter: spnCounter,
      numReqReadings: numReqReadings,
      readingHistory: readingHistory
    }
  }