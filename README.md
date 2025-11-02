# Development and (Google Cloud) deployment configuration for Node.js backend

## Start local

```bash
docker compose up
```

## Deploy to staging

```bash
git checkout staging
git commit -m <message>
git push
```

> Note: The name of the bransh must be **staging**

## Deploy to production

```bash
git checkout production
git commit -m <message>
git push
```

> Note: The name of the bransh must be **production**
