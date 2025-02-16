Scripts contains backend scripts that cant interfere with the frontend like database seeding, cronjobs and migrations.

Why Keep scripts/ at the Root?
It’s not part of Next.js's compiled code, so keeping it separate prevents it from interfering with frontend builds.
Developers can easily run database scripts or any scripts from the root with:

```
node scripts/seed.js
```

Similar to other backend scripts (like migrations or cron jobs), it's more organized.

