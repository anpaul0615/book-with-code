# ch01. 객체, 설계

## 티겟 판매 애플리케이션 구현하기

```typescript
class Invitation {
  private when: Date;

  constructor(when: Date) {
    this.when = when;
  }
}
```
```typescript
class Ticket {
  private fee: number;

  getFeee(): number {
    return fee;
  }
}
```
```typescript
class Bag {
  private amount: number;
  private invitaton: Invitation;
  private ticket: Ticket;

  constructor(amount: number, invitation?: Invitation) {
    this.amount = amount;
    this.invitation = invitation ?? null;
  }

  hasInvitatoin(): boolean {
    return invitation != null;
  }
  hasTicket(): boolean {
    return ticket != null;
  }
  setTicket(ticket: Ticket): void {
    this.ticket = ticket
  }
  minusAmount(amount: number): void {
    this.amount -= amount;
  }
  plusAmount(amount: number): void {
    this.amount += amount;
  }
}
```
```typescript
class Audience {
  private bag: Bag;
  
  constructor(bag: Bag) {
    this.bag = bag;
  }

  getBag(): Bag {
    return bag;
  }
}
```
```typescript
class TicketOffice {
  private amount: number;
  private tickets: Array<Ticket> = [];

  constructor(amount: number, ...tickets:Array<Ticket>) {
    this.amount = amount;
    this.tickets = tickets;
  }

  getTicket(): Ticket {
    return tickets.shift();
  }

  minusAmount(amount: number): void {
    this.amount -= amount;
  }

  plusAmount(amount: number): void {
    this.amount += amount;
  }
}
```
```typescript
class TicketSeller {
  private ticketOffice: TicketOffice;
  
  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  getTicketOffice(): TicketOffice {
    return ticketOffice;
  }
}
```
```typescript
class Theater {
  private ticketSeller: TicketSeller;
  
  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  enter(audience: Audience): void {
    if (audience.getBag().hsiInvitation()) {
      const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
      audience.getBag().setTicket(ticket);
    } else {
      const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
      audience.getBag().minusAmount(ticket.getFee());
      ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
      audience.getBag().setTicket(ticket);
    }
  }
}
```


## 무엇이 문제인가

> ..Theater 클래스의 enter 메서드가 수행하는 일을 말로 풀어보자.
> 
> 소극장은 관람객의 가방을 열어 그 안에 초대장이 들어있는지 살펴본다. 가방 안에 초대장이 들어있으면, 판매원은 매표소에보관돼 있는 티켓을 관람객의 가방 안으로 옮긴다. 가방 안에 초대장이 들어있지않다면, 관람객의 가방에서 티켓 금액만큼의 현금을 꺼내 매표소에 적립한 후에 매표소에 보관돼 있는 티켓을 관람객의 가방안으로 옮긴다.

> ..문제는 관람객과 판매원이 소극장의 통제를 받는 수동적인 존재라는 점이다.

> ..더 큰 문제는 티켓을 꺼내 관람객의 가방에 집어넣고 관람객에서 받은돈을 매표소에 적립하는 일을 소극장이 수행한다는 점이다.

> ..Theater 의 enter 메서드를 이해하기 위해서는 Audience 가 Bag 을 가지고 있고, Bag 안에는 현금과 티켓이 들어있으며, TicketSeller 가 TicketOffice 에서 티켓을 판매하고, TicketOffice 안에 돈과 티켓이 보관돼 있다는 모든 사실을 동시에 기억하고 있어야 한다.

> ..하지만 가장 심각한 문제는 ... Audience 와 TicketSeller 를 변경할 경우 Theater 도 함께 변경해야 한다는 사실이다.

> ..이것은 객체 사이의 의존성(dependency) 과 관련된 문제다. ... 의존성은 변경에 대한 영향을 암시한다. 의존성이라는 말 속에는 어떤 객체가 변경될때 그 객체에만 의존하는 다른 객체도 함께 변경될수있다는 사실이 내포돼 있다.

> ..그렇다고 해서 객체 사이의 의존성을 완전히 없애는 것이 정답은 아니다. 객체지향 설계는 서로 의존하면서 협력하는 객체들의 공동체를 구축하는 것이다. 따라서 우리의 목표는 애플리케이션의 기능을 구현하는데 필요한 최소한의 의존성만 유지하고 불필요한 의존성을 제거하는 것이다.

> ..객체 사이의 의존성이 과한 경우를 가리켜 결함도(coupling) 가 높다고 말한다. ... 두 객체 사이의 결합도가 높으면 높을수록 함께 변경될 확률도 높아지기 때문에 변경하기 어려워진다. 따라서 설계의 목표는 객체 사이의 결합도를 낮춰 변경이 용이한 설계를 만드는 것이어야 한다.


## 설계 개선하기

> ..코드를 이해하기 어려운 이유는 Theater 가관람객의 가방과 판매원의 매표소에 직접 접근하기 때문이다. 이것은 관람객과 판매원은 자신의 일을 스스로 처리해야 한다는 우리의 직관을 벗어난다. 다시말해서 의도를 정확하게 의사소통하지 못하기 때문에 코드가 이해하기 어려워진 것이다.

> ..해결방법은 간단하다. Theater 가 Audience 와 TicketSeller 에 관해 너무 세세한 부분까지 알지 못하도록 정보를 차단하면 된다. ... Theater 가 원하는 것은 관람객이 소극장에 입장하는 것뿐이다. 따라서 관람객이 스스로 가방 안의 현금과 초대장을 처리하고 판매원이 스스로 매표소의 티켓과 판매요금을 다루게 한다면 이 모든 문제를 한 번에 해결할 수 있을 것이다.

> ..첫번째 단계는 Theater 의 enter 메서드에서 TicketOffice 에 점근하는 모든 코드를 TicketSeller 내부로 숨기는 것이다.

```typescript
class Theater {
  private ticketSeller: TicketSeller;
  
  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  // enter(audience: Audience): void {
  //   if (audience.getBag().hsiInvitation()) {
  //     const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
  //     audience.getBag().setTicket(ticket);
  //   } else {
  //     const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
  //     audience.getBag().minusAmount(ticket.getFee());
  //     ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
  //     audience.getBag().setTicket(ticket);
  //   }
  // }

  enter(audience: Audience): void {
    ticketSeller.sellTo(audience);
  }
}
```
```typescript
class TicketSeller {
  private ticketOffice: TicketOffice;
  
  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  // getTicketOffice(): TicketOffice {
  //   return ticketOffice;
  // }

  sellTo(audience: Audience): void {
    if (audience.getBag().hsiInvitation()) {
      const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
      audience.getBag().setTicket(ticket);
    } else {
      const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
      audience.getBag().minusAmount(ticket.getFee());
      ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
      audience.getBag().setTicket(ticket);
    }
  }
}
```

> ..결과적으로 ticketOffice 에 대한 접근은 오직 TicketSeller 안에서만 존재하게 된다. 따라서 TicketSeller 는 TicketOffice 에서 티켓을 꺼내거나 판매 요금을 적립하는 일을 스스로수행할 수밖에 없다.

> ..이처럼 개념적이나 물리적으로 객체 내부의 세부적인 사항을 감추는 것을 캡슐화(encapsulation) 라고 부른다. 캡슐화의 목적은 변경하기 쉬운 객체를 만드는 것이다. 캡슐화를 통해 객체 내부로의 접근을 제한하면 객체와 객체 사이의 결합도를 낮출 수 있기 때문에 설계를 좀 더 쉽게 변경할 수 있게 된다.

> ..수정된 Theater 는 ticketOffice 가 TicketSeller 내부에 존재한다는 사실을 알지 못한다. Teater 는 단지 ticketSeller 가 sellTo 메시지를 이해하고 응답할 수 있다는 사실만 알고 있을 뿐이다.

> ..Theater 는 오직 TicketSeller 의 인터페이스(interface) 에만 의존한다. TicketSeller 가 내부에 TicketOffice 인스턴스를 포함하고 있다는 사실은 구현(implementation) 의 영역에 속한다.

> ..동일한 방법으로 Audience 를 개선할 수 있다.

```typescript
class TicketSeller {
  private ticketOffice: TicketOffice;
  
  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  sellTo(audience: Audience): void {
    // if (audience.getBag().hsiInvitation()) {
    //   const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
    //   audience.getBag().setTicket(ticket);
    // } else {
    //   const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
    //   audience.getBag().minusAmount(ticket.getFee());
    //   ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
    //   audience.getBag().setTicket(ticket);
    // }
    const ticket: Ticket = ticketOffice.getTicket();
    ticketOffice.plushAmount(audience.buy(ticket));
  }
}
```
```typescript
class Audience {
  private bag: Bag;
  
  constructor(bag: Bag) {
    this.bag = bag;
  }

  // getBag(): Bag {
  //   return bag;
  // }

  buy(ticket: Ticket): number {
    if (bag.hsiInvitation()) {
      bag.setTicket(ticket);
      return 0;
    } else {
      bag.setTicket(ticket);
      bag.minusAmount(ticket.getFee());
      return ticket.getFee();
    }
  }
}
```

> ..변경된 Audience 는 자신의 가방 안에 초대장이 들어있는지를 스스로 확인한다. ... Audience 가 Bag 을 직접 처리하기 때문에 외부에서는 더이상 Audience 가 Bag 을 소유하고 있다는 사실을 알 필요가 없다.

> ..핵심은 객체 내부의 상태를 캡슐화하고 객체 간에 오직 메시지를 통해서만 상호작용하도록 만드는 것이다.

> ..Theater 는 TicketSeller 의 내부에 대해서는 전혀 알지 못한다. 단지 TicketSeller 가 sellTo 메시지를 이해하고 응답할 수 있다는 사실만 알고 있을 뿐이다.

> ..TicketSeller 역시 Audience 의 내부에 대해서는 전혀 알지 못한다. 단지 Audience 가 buy 메시지에 응답할 수 있고 자신이 원하는 결과를 반환할 것이라는 사실만 알고 있을 뿐이다.

---

> ..밀접하게 연관된 작업만을 수행하고 연관성 없는 작업은 다른 객체에게 위임하는 객체를 가리켜 응집도(cohesion) 가 높다고 말한다. 자신의 데이터를 스스로 처리하는 자율적인 객체를 만들면 결합도를 낮출 수 있을뿐더러 응집도를 높일 수 있다.

> ..변경하기 쉬운 설계는 한 번에 하나의 클래스만 변경할 수 있는 설계다.

> ..자신의 데이터를 스스로 처리하도록 프로세스의 적절한 단계를 이동시키는 것이다. 이처럼 데이터와 프로세스가 동일한 모듈 내부에 위치하도록 프로그래밍하는 방식을 객체지향 프로그래밍(Object-Oriented Programming) 이라고 부른다.

---

> ..절차지향과 객체지향 사이의 근본적인 차이를 만드는 것은 책임(=기능)의 이동(shift of responsibility) 이다.

> ..변경 전의 절차적 설계에서는 Theater 가 전체적인 작업을 도맡아 처리했다. 변경 후의 객체지향 설계에서는 각 객체가 자신이 맡은 일을 스스로 처리했다. 다시 말해 Theater 에 몰려 있던 책임이 개별 객체로 이동한 것이다. 이것이 바로 "책임의 이동" 이다.

> ..객체가 어떤 데이터를 가지느냐보다는 객체에 어떤 책임을 할당할 것이냐에 초점을 맞춰야 한다.

> ..최소한의 의존성만을 남기는 것이 훌륭한 객체지향 설계다.


