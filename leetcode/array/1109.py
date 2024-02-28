class Solution:
    def corpFlightBookings(self, bookings: List[List[int]], n: int) -> List[int]:
        seats = [0 for i in range(n)]
        diff = seats.copy()

        for i in bookings:
            diff[i[0]-1] += i[2]
            if i[1] >= n:
                pass
            else:
                diff[i[1]] -= i[2]
        
        seats[0] = diff[0]
        for i in range(1, n):
            seats[i] = seats[i-1] + diff[i]
        
        return seats

