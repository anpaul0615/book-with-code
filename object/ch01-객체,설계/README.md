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

