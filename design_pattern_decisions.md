# Design Pattern Decisions

Info:
- Implement emergency stop
- What other design patterns have you used / not used?
  - Why did you choose the patterns that you did?
  - Why not others?

## Response

- I didn't implement an `emergency stop` mechanism because I haven't seen the course related to this subject yet
- I did implement a `Owned` mechanism, that the contracts `Store` and `StoreOwner` inherit from
- The code is separated into 4 different contracts, they contain their specific business logic and can be upgraded independently
