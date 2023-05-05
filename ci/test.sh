          
branchName=clin-123
if ! [[ sed-4.2.2.${branchName} =~ ([a-z]{2,8}-[0-9]+[a-z0-9\-]) ]]
          then
            echo "Le nom de branche contient des caratere spa"
            exit 1
          fi
