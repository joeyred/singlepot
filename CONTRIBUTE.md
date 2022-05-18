## Conventional Commits

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
### Types

| syntax | title | usage |
|---|---|---|
| `feat` | Feature | A new feature. |
| `fix` | Bug Fix | A bug fix (hotfix in semver). |
| `docs` | Documentation | Any changes to documentation content. |
| `style` | Style and Format | Changes that Don't impact the meaning of the code, i.e. white space, formatting, punctuation, semi-colons, etc... |
| `refactor` | Code Refactors | Any changes to code that doesn't fix a bug, or add any features. |
| `perf` | Performance Improvements | A change to the code that improves performance (speed/stability). |
| `test` | Unit Tests | Adding tests, updating/correcting current tests, etc... |
| `build` | Build/Pipeline | Changes that affect the build/dev process. |
| `ci` | Continuous Integration | Changes to CI ranging from configuration files, scripts, and any other release/deployment related things. |
| `chore` | Chores | Any changes that don't modify source or test files. |
| `revert` | Reverts | Reverting to a pervious commit. |

### Scopes

Scopes should be the name of the package/app being directly affected in the repo.

