# Wright App _ front  

Mobile App 'Wright' Frontend using ReactNative

Training diary services for athletes ππ»ββοΈ

2021 'κ²½ν¬λνκ΅ Startup the dream' λμμ μμνμμ΅λλ€ π


***

Abstract
------------
λΉ λ₯΄κ³  κ°νΈνκ² μμ±νλ νλ ¨μΌμ§.    
μ²΄κ³μ μ΄κ³  ν¨κ³Όμ μΌλ‘ νλ ¨ λ΄μ©, λΆμ, μ»¨λμλμ κ΄λ¦¬ν  μ μλλ‘ λμμ£Όλ λͺ¨λ°μΌ μ΄νλ¦¬μΌμ΄μμλλ€.   
μ΄ λ ν¬μ§ν λ¦¬μλ νλ‘ νΈμλ μ½λκ° λ΄κ²¨μμ΅λλ€.
νλ‘ νΈμλλ μ μ§νμ΄ λ΄λΉνμκ³  κ΄λ¦¬νκ³  μμ΅λλ€.   
#### λ°±μλμ κ΄λ ¨λ λ΄μ©μ μ¬κΈ°μ νμΈν  μ μμ΅λλ€: [Click Here][back_link]

[back_link]: https://github.com/PodiumDreaming/Dreaming_Podium_Backend "λ°±μλ κΉνλΈ"

Quick and easy way to write trainging report.   
Wright is a mobile application that helps manage training, injury, conditioning records in a systematic and effeective manner.   
This repository contains all information about frontend code.   
Frontend part is made and managed by Jihyoun Jeong.   
#### You can check backend here: [Click Here][back_link]

***

Team Member
-----------
#### κ²½ν¬λνκ΅ μ»΄ν¨ν°κ³΅νκ³Ό
2017104024 μ λ―Όν jeongmh09@naver.com   
2018103062 μ μ§ν jihyoun0602@gmail.com   


***

Composition
-----------
νλ‘μ νΈμ μ£Όμ κ΅¬μ± μμλ λ€μκ³Ό κ°μ΅λλ€:      
Major composition of this project are as followed:   
> * App
>   + assets
>     - fonts
>     - images
>     - svg
>   + components
>     + conditioning
>       - AppSelectPane.js
>       - AppSlider.js
>       - AppXBar.js
>       - ConditionCard.js
>       - ConditionSelect.js
>       - EmptyCard.js
>       - FullCondition.js
>       - FullInjury.js
>       - InjurySelect.js
>     + training
>       - AppCollasibleContent.js
>       - AppCollapsibleTitle.js
>       - CollapsibleCard.js
>       - HeaderProfile.js
>       - ImageDelete.js
>       - RoutineItem.js
>     - AppCalender.js
>     - AppModal.js
>     - AppPicker.js
>     - AppSwiper.js
>     - CheckButton.js
>     - Footer.js
>     - HomePareCard.js
>     - InjurySVG.js
>     - ObjectCard.js
>     - ObjectItems.js
>     - ProfileInputLine.js
>     - SocialButton.js
>   + config
>   + navigation
>     - BottomTab.js
>     - DepthStack.js
>     - DreamStack.js
>     - HomeStack.js
>     - MainStack.js
>     - ProfileStack.js
>   + reducer
>     - modalSlice.js
>     - postingSlice.js
>     - userSlice.js
>   +screens
>     + Auth
>       - LoginScreen.js
>       - loginApple.js
>       - loginKakao.js
>     + Depth
>       - ConditioningNoteScreen.js
>       - ProfileEditScreen.js
>       - TrainingNoteScreen.js
>       - WritingScreen.js
>     + Home
>       - DreamScreen.js
>       - HomeScreen.js
>       - ProfileScreen.js
>   +utils
>     - api.js
>     - auth.js
>     - note.js
>     - profile.js
>   - index.js
>   - store.js
> * ios 
> * android 
> * package.json 
> * pakage-lock.json

### Description
#### android
android ν΄λμλ android project νμΌμ΄ λ΄κ²¨μμ΅λλ€. android appμ build ν  λ μ¬μ©ν©λλ€.  
android folder contains android project files. It is used when building an android app.
#### ios
ios ν΄λμλ ios project νμΌμ΄ λ΄κ²¨μμ΅λλ€. ios appμ build ν  λ μ¬μ©ν©λλ€.  
ios folder contains ios project files. It is used when building an ios app.
#### index.js
applicationμ μ½λκ° bundling λ©λλ€.
Bundle this application.
#### store.js
Redux sotre μ μ²΄ μ μ­ λ³μλ₯Ό λͺ¨μμ κ΄λ¦¬ν©λλ€.
Manages all global variables of Redux store.
#### utils
axios μΈμ€ν΄μ€λ₯Ό μμ±ν api.jsμ΄ μμ΅λλ€. λ‘κ·ΈμΈ,κΈ°λ‘ ,νλ‘ν ννΈμ νμν ν΅μ μ λͺ¨λν νμ¬ κ΄λ¦¬ν©λλ€.
Base url μ λ³΄μμ μν΄ νκ²½ λ³μλ‘ κ΄λ¦¬ν©λλ€.
api.js that created an axios instance. Defines  login, record, and profile axios operations to axios communicate.
Base url is managed as an environment variable for security.
#### screens
μ€ν¬λ¦°μ λͺ¨μλ νμΌμλλ€. κ° μ€ν¬λ¦°λ€μ μ»΄ν¬λνΈλ€λ‘ μ΄λ£¨μ΄μ Έ μμ΅λλ€.
Containing screens. Each screen is made up of components.
#### reducer
Redux κ΄λ ¨ ν¨μλ€μ λͺ¨μλμ νμΌμλλ€. Createasyncthunkλ₯Ό μ¬μ©νμ¬ λΉλκΈ° μ²λ¦¬λ₯Ό νμκ³  κΈ΄ μ½λλ₯Ό κ°λ¨νκ² μμ±ν  μ μμμ΅λλ€.
File that collects functions related to Redux. Createasyncthunk for asynchronous processing, and for write long code simply.
#### navigation
μ±μ νλ©΄ μ ν λ° νμ κΈ°λ‘μ μν navagatorλ₯Ό κ΄λ¦¬νλ νμΌμλλ€.
Manages the navagator for app's screen transitions and navigation history.
#### config
κΈλ‘λ²μ€νμΌ λ° μ§ν λ¦¬μ€νΈ λ±μ λͺ¨μλμ νμΌμλλ€.
Defines globalStyle and manages information for picker list.
#### components
κ° μ€ν¬λ¦°μ μ°μ΄λ μ»΄ν¬λνΈλ₯Ό λ³΄κ΄ν νμΌμλλ€. μ»¨λμλ, νΈλ μ΄λ, κ³΅ν΅ μ»΄ν¬λνΈλ‘ μ±κ²©μ΄ λλμ΄μ Έ μμΌλ©° κ° μ»΄ν¬λνΈλ€μ μ¬μ¬μ© κ°λ₯ν©λλ€.
Contains the components used for each screen. It is divided into conditioning, training, and common components, and each component is reusable.
#### assets
μ΄λ―Έμ§μ ν°νΈλ₯Ό λ³΄κ΄νλ νμΌμλλ€.
Stores images and fonts.

***



## Initial Screen
<img src="https://user-images.githubusercontent.com/55846598/145140612-9f199952-5ee2-4c14-abba-5e210f44484c.PNG"  width="200" height="400"/>


## Installation    

######  1. Install NPM packages
```
npm install
```
######  2. Install pod
```
cd ios && pod install 
```
######  3. Start
```
npm run start
```
######  4. Run simulator
```
npx react-native run-ios / npx react-native run-android
```


---


### License
Distributed under the DreamingPodium and Jihyoun Jung.

### Contact
Jihyoun Jung - jihyoun0602@gmail.com
