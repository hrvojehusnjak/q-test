import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { combineLatest, forkJoin, Observable, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'
import { PostsService } from 'src/core/services/post.service'
import { UsersService } from 'src/core/services/user.service'
import { PostExtended, User } from 'src/core/models/models'

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.scss']
})
export class PostsDetailComponent implements OnInit {
  public post: PostExtended
  public isLoading$: Observable<boolean>

  private readonly _destroy = new Subject<boolean>()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService
  ) {
    const postId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.post = this.router.getCurrentNavigation()?.extras.state as PostExtended
    if (!this.post) {
      forkJoin([
        this.usersService.getUsers(),
        this.postsService.getPostById(postId)
      ])
        .pipe(takeUntil(this._destroy))
        .subscribe(([users, post]) => {
          this.post = {
            ...post,
            user: users.find((user) => user.id === post.userId) as User
          }
        })
    }
    this.isLoading$ = combineLatest([
      this.postsService.isLoading$,
      this.usersService.isLoading$
    ]).pipe(
      map(
        ([arePostsLoading, areUsersLoading]) =>
          arePostsLoading || areUsersLoading
      )
    )
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
  }
}
