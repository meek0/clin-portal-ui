# About
This project is the frontend web application for _clin_ and is designed to be used in specific environments specialized in genomics.


## Development

## Variables

This application takes minimally the following variables as input:

- **REACT_APP_KEYCLOAK_CONFIG**: Keycloack configurations needed for auth.
- **REACT_APP_ARRANGER_API**: Arranger endpoint.
- **REACT_APP_ARRANGER_PROJECT_ID**: Specific Arranger project's version.
- **REACT_APP_FHIR_SERVICE_URL**: Fhir endpoint.
- **REACT_APP_ZEPLIN_URL**: Zepplin notebook endpoint.
- **REACT_APP_FHIR_CONSOLE_URL**: Fhir console endpoint.
- **REACT_APP_WEB_ROOT**: Web root endpoint.

## clin-portal-theme
Common styles for the project are defined in ```clin-portal-theme``` dependency.
To update those styles, juste update the dependency version.

### local dev
#### direct link
To use your local ```clin-portal-theme``` in place of the one in dependencies you can use the make target:
```bash
make theme_local
```
The project will use your local ```clin-portal-theme``` so watch script will react to any changes (once you build the ```clin-portal-theme```)  

To eject the local ```clin-portal-theme``` use the make target:
```bash
make theme_external
```

#### using temporary tags
You can also simply use custom tag in your local ```clin-portal-theme``` (for exemple you can use a tag matching the Jira story: @clin-xxxx).  
You'll need to update the tag after any changes in the project (you can use the make target **retag** of theme: ```t=@clin-xxxx make retag```).  
Once ```clin-portal-theme``` is re-tagged, you can simply use the make target:
 ```bash
make theme_clean_install
```
This will update your dependency with last tag.

## Development Setup

Before going further, make sure that ```docker``` and ```docker-compose``` are installed on your system.

```bash
# 1. clone the repository
  git clone --recursive git@github.com:Ferlab-Ste-Justine/clin-portal-ui.git

# 2. enter the project's folder
  cd clin-portal-ui

# 3. create an .env file (you may have to adjust the template to your needs)
  cp -p env-qa .env

### With docker

# 1. in a terminal, run docker-compose from project's docker-compose file.
  docker-compose up

# 2. to clean up afterwards once your are done developing.
  docker-compose down
```
:warning: _With this setup, your host and the app's container share the project directory/volume._


## Branches

All new development should happen on a supporting branch on the developper fork rather than directly on `dev` or `master`.

Once development is complete for the scope defined by the supporting branch, a pull request can be made for the `dev` branch against upstream for code review.

1. Fork kf-portal-ui | go to [clin-portal-ui repo](https://github.com/Ferlab-Ste-Justine/clin-portal-ui) then follow [these instruction](https://help.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository)

2. Clone

   ```
   git clone git@github.com:Ferlab-Ste-Justine/clin-portal-ui.git
   git remote add [unique_name] git@github.com:[your fork]
   ```

3. Create a new task branch

   ```sh
   git fetch --all
   git checkout -B [my_branch] origin/main
   ```

4. Rebase against origin dev before creating a push request

   ```
   git fetch --all
   git rebase -i origin/main
   ```

5. Create a push request

   ```
    git push [unique_name] [my_branch]
   ```

6. go to [clin portal repo](https://github.com/Ferlab-Ste-Justine/clin-portal-ui/pulls) and create the push request

## Commit

Commit message should follow a customized [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

Message structure is `type([scope]): #[github ticker number] message`

e.g.

```
"fix(CohortBuild): #23432 Resolve issue with ..."

"feat: #23423 Member can now do ..."
```

Supported types:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
