#!/usr/bin/env bash
# set -eu
# Variables need to execute test
ENV="${1-NA}"
CATEGORY="${2-NA}"
HEADLESS="${3:-YES}"
BROWSER="${4:-CHROME}"
BASE_URL="${5:-NA}"

AVAILABLE_ENVS="integration staging prod local"
AVAILABLE_CATEGORY=" file NA Login Open"
AVAILABLE_BROWSER=" FILE CHROME FIREFOX"


if [[ ! ${AVAILABLE_ENVS} =~ (^|[[:space:]])"$ENV"($|[[:space:]]) ]]; then
    echo "$ENV is not an available environment"
    exit 1
fi

if [[ ! ${AVAILABLE_TAG} =~ (^|[[:space:]])"$TAG"($|[[:space:]]) ]]; then
    echo "$TAG is not an available service to test"
    exit 1
fi

if [[ ! ${AVAILABLE_BROWSER} =~ (^|[[:space:]])"$BROWSER"($|[[:space:]]) ]]; then
    echo "$BROWSER is not an available service to test"
    exit 1
fi


if [ "$BASE_URL" == "NA" ]
then
  BASE_URL="https://opensource-demo.orangehrmlive.com"
if [ "${ENV}" == "staging" ]
then
  BASE_URL="https://opensource-demo.orangehrmlive.com"
fi
if [ "${ENV}" == "prod" ]
then
  BASE_URL="https://opensource-demo.orangehrmlive.com"
fi
else
  BASE_URL="https://"$BASE_URL
  echo "Custom BASE_URL will be used"
fi

export CYPRESS_Base_Url=${BASE_URL}

# if [ "$BASE_URL" == "NA" ]
# then
#   BASE_URL="https://opensource-demo.orangehrmlive.com"

# if [ "${ENV}" == "staging" ]
# then
#   BASE_URL="https://opensource-demo.orangehrmlive.com"
#   export CYPRESS_Base_Url="https://opensource-demo.orangehrmlive.com/"
# fi
# if [ "${ENV}" == "prod" ]
# then
#   export CYPRESS_Base_Url="https://opensource-demo.orangehrmlive.com/"
# fi
# if [ "${ENV}" == "integration" ]
# then
#   export CYPRESS_Base_Url="https://opensource-demo.orangehrmlive.com/"
# #  export CYPRESS_BASE_URL=${BASE_URL}
# #  echo "Custom BASE_URL will be used"
# fi
# else
#   export CYPRESS_Base_Url=${BASE_URL}
#   echo "Custom BASE_URL will be used"
# fi

# if [ "$BASE_URL" ]
# then
#   BASE_URL=${CYPRESS_Base_Url}
# else
#   echo "Custom BASE_URL will be used"
# fi

export CYPRESS_Environment=${ENV}

if [ "${HEADLESS}" != "YES" ]
then
  MODE="--headed"
  export CYPRESS_Head_Mode="--headed"
elif [ "${HEADLESS}" != "Yes" ]
then
  MODE="--headed"
  export CYPRESS_Head_Mode="--headed"
else
  MODE="headless"
  export CYPRESS_Head_Mode=""
fi
#export HEADMODE=""

if [ "$BROWSER" == "CHROME" ]
then
  BROWSER="chrome"
elif [ "$BROWSER" == "FIREFOX" ]
then
  BROWSER="firefox"
else
  BROWSER="chrome"
fi

export ENV=${ENV}
export TAG=${TAG}
export MODE=${MODE}
export BROWSER=${BROWSER}
export BASE_URL=${BASE_URL}




echo "***** Test environment: ${ENV} *****"
echo "***** Cucumber Annotation: ${TAG} *****"
echo "***** HEADLESS MODE to be used is : ${HEADLESS} *****"
echo "***** BROWSER MODE to be used is : ${BROWSER} *****"
echo "***** BASE URL to be used is : ${BASE_URL} *****"
echo "***** Executing test script started *****"


# if [ "$CATEGORY" == "file" ]
# then
#   ENV=${ENV}${MODE}${BROWSER} npm run wdio @${TAG}
# else
#   echo "RUN ${CATEGORY} tests"
#   ENV=${ENV} npx cypress run ${CYPRESS_Head_Mode} --spec cypress/e2e/login/**/*.ts --env runner=${CYPRESS_Base_Url},allure=true
# fi

if [ "$CATEGORY" == "NA" ]
then
  ENV = ${ENV} npx cypress run ${CYPRESS_Head_Mode} --spec cypress/e2e/**/*.ts --env runner=${CYPRESS_Base_Url},allure=true
elif [ "$CATEGORY" != "NA" ]
then
  if [ "$CATEGORY" == "Open" ]
  then
    ENV=${ENV} npx cypress open --env runner=${CYPRESS_Base_Url},allure=true
  else
    ENV=${ENV} npx cypress run ${CYPRESS_Head_Mode} --browser ${BROWSER} --spec cypress/e2e/${CATEGORY}/**/*.ts --env runner=${CYPRESS_Base_Url},allure=true
  fi
else
  ENV=${ENV} npx cypress run ${CYPRESS_Head_Mode} --browser ${BROWSER} --env runner=${CYPRESS_Base_Url},allure=true
fi


# else
# if [ ${SUB_CATEGORY} == "All" ]
# then
# echo "RUN all ${CATEGORY} tests"
# ENV=${ENV} npm run test:${CATEGORY}
#       else
#       echo "SUBTYPE PRESENT!"
#       ENV=${ENV} npm run test:${CATEGORY}-${SUB_CATEGORY}
#       fi




echo "***** Test script execution completed *****"